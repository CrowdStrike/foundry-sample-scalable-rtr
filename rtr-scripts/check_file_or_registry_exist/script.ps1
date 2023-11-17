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

function Write-Json([Parameter(Mandatory=$true)][hashtable]$Hashtable){
  if($PSVersionTable.PSVersion.ToString() -lt 3.0){
    $Serializer.Serialize($Hashtable)
  }else{
    ConvertTo-Json $Hashtable -Depth 8 -Compress
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

function Get-RegistryKey{
  param(
    [Parameter(Mandatory=$true)][ValidateNotNullOrEmpty()][string]$Key,[ValidateNotNullOrEmpty()][string]$Value
  )
  $test = test-path -path "$Key"

  if(-not($test)){
    Return "False"
  }
  else{
  Return "True"}
}


try{
  if($PSVersionTable.PSVersion.ToString() -lt 3.0){
    Add-Type -AssemblyName System.Web.Extensions
    $Serializer=New-Object System.Web.Script.Serialization.JavascriptSerializer
  }
  if($args[0]){$Param=Convert-Json $args[0]}
  $Applications=@{}
  foreach($obj in $Param.keys)
{
    $Applications[$obj] = @{
        Exists = Get-RegistryKey $obj
    }
}
Write-Json (Format-Result $Applications)
}catch{
  throw $_
}