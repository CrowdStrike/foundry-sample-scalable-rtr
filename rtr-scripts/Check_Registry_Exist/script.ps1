 function Convert-Hashtable([Parameter(Mandatory=$true)][psobject]$Object){
  [hashtable]$i=@{}
  $Object.PSObject.Properties|?{![string]::IsNullOrEmpty($_.Value)}|%{
    $i[($_.Name -replace '\s','_' -replace '\W',$null)]=$_.Value
  }
  $i
}
function Convert-Json([Parameter(Mandatory=$true)][string]$String){
  if($PSVersionTable.PSVersion.ToString() -lt 3.0){
    $Serializer.DeserializeObject($String)
  }else{
    $Object=$String|ConvertFrom-Json
    if($Object){Convert-Hashtable $Object}
  }
}
function Format-Result([Parameter(Mandatory=$true)][hashtable[]]$Hashtable,[string]$String){
  'AG','CU'|%{
    $Sim=(iwmi -Namespace root\cimv2 -Class StdRegProv -Name GetBinaryValue @(2147483650,
      'SYSTEM\CurrentControlSet\Services\CSAgent\Sim',$_)).uValue
    if($Sim){nv -Name $_ -Value ([System.BitConverter]::ToString($Sim)).Replace('-',$null).ToLower()}
  }
  [hashtable]@{cid=$CU;aid=$AG;result=$Hashtable}
}
function Write-Json([Parameter(Mandatory=$true)][hashtable]$Hashtable){
  if($PSVersionTable.PSVersion.ToString() -lt 3.0){
    $Serializer.Serialize($Hashtable)
  }else{
    $answer = ConvertTo-Json $Hashtable -Depth 8 -Compress
    return $answer
  }
}
function Get-RegistryKey{
  param(
    [Parameter(Mandatory=$true)][ValidateNotNullOrEmpty()][string]$Key,[ValidateNotNullOrEmpty()][string]$Value
  )
  function Get-ValueData([string]$Type,[hashtable]$Splat,[uint32]$hDefKey,[string]$sSubKeyName,[string]$Name){
    [string]$Method=switch($Type){
      'REG_BINARY' {'GetBinaryValue'}
      'REG_DWORD' {'GetDWORDValue'}
      'REG_EXPAND_SZ' {'GetExpandedStringValue'}
      'REG_MULTI_SZ' {'GetMultiStringValue'}
      'REG_SZ' {'GetStringValue'}
      'REG_QWORD' {'GetQWORDValue'}
    }
    iwmi @Splat -Name $Method @($hDefKey,$sSubKeyName,$Name)|%{
      if($Type -eq 'REG_BINARY'){
        ([System.BitConverter]::ToString($_.uValue)).Replace('-',$null)
      }elseif($Type -eq 'REG_DWORD'){
        "0x$($_.uValue.ToString('x1'))"
      }elseif($Type -eq 'REG_QWORD'){
        "0x$($_.uValue.ToString('x8'))"
      }else{
        $_.sValue
      }
    }
  }
  function Get-ValueType([object]$Object,[string]$String){
    switch($Object.Types[[array]::IndexOf($Object.sNames,$String)]){
      1 {'REG_SZ'}
      2 {'REG_EXPAND_SZ'}
      3 {'REG_BINARY'}
      4 {'REG_DWORD'}
      7 {'REG_MULTI_SZ'}
      11 {'REG_QWORD'}
    }
  }
  [string[]]$Path=$Key.Split('\',2)
  [uint32]$Path[0]=switch -Regex ($Path[0]){
    '^HKEY_CLASSES_ROOT' {2147483648}
    '^HKEY_CURRENT_USER|HKCU' {2147483649}
    '^HKEY_LOCAL_MACHINE|HKLM' {2147483650}
    '^HKEY_USERS|HKU' {2147483651}
    '^HKEY_CURRENT_CONFIG' {2147483653}
  }
  if($Path[0] -and !$Path[1]){$Path+=$null}
  [hashtable]$Splat=@{Namespace='root\cimv2';Class='StdRegProv'}
  [object]$EnumValues=iwmi @Splat -Name EnumValues @($Path[0],$Path[1])
  if($EnumValues.ReturnValue -eq 2){
    throw "No result(s) for '$(($Key,$Value -join '\') -replace '\\$',$null)'."
  }elseif($EnumValues.ReturnValue -ne 0){
    throw "ERROR 0x$(($EnumValues.ReturnValue).ToString('x1'))."
  }else{
    if($Value){
      [string]$Type=Get-ValueType $EnumValues $Value
      Write-Json (Format-Result @{
        Key=$Key
        Value=@{
          Name=$Value
          Type=$Type
          Data=Get-ValueData $Type $Splat $Path[0] $Path[1] $Value
        }
      } RegistryKey)
  }else{
      [hashtable]$Output=@{Key=$Key}
      [object]$EnumKey=iwmi @Splat -Name EnumKey @($Path[0],$Path[1])
      if($EnumKey.ReturnValue -eq 0 -and $EnumKey.sNames){$Output['SubKey']=[string[]]$EnumKey.sNames}
      if($EnumValues.sNames -and $EnumValues.Types){
        [hashtable[]]$Values=foreach($Name in $EnumValues.sNames){
          [string]$Type=Get-ValueType $EnumValues $Name
          @{
            Name=$Name
            Type=$Type
            Data=Get-ValueData $Type $Splat $Path[0] $Path[1] $Name
          }
        }
        if($Values){$Output['Value']=$Values}
      }
      $answer = Write-Json (Format-Result $Output RegistryKey)
      return $answer
    }
  }
}
try{
  $Body = @(
  )
  if($PSVersionTable.PSVersion.ToString() -lt 3.0){
    Add-Type -AssemblyName System.Web.Extensions
    $Serializer=New-Object System.Web.Script.Serialization.JavascriptSerializer
  }
  if($args[0]){$Param=ConvertFrom-Json $args[0]}
  for ($i=0; $i -lt $Param.keys.Length; $i++)
{
    $k1 = $Param.keys[$i]
    $answer = Get-RegistryKey $Param.keys[$i]
    $answer=ConvertFrom-Json $answer
    $k2 = ConvertFrom-Json $Param.values[$i]
    $contentEqual = ($k2 | ConvertTo-Json -Compress) -eq 
                ($answer.result[0].value | ConvertTo-Json -Compress)
    $Body += @{Key=$k1; Match=$contentEqual}
}
$jsonResponse = @{
    result=$Body
}
$jsonResponse = $jsonResponse | ConvertTo-Json
Write-Output $jsonResponse
}catch{
$_.Exception | Format-List -Force
  throw $_.result
} 
