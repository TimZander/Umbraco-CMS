namespace Umbraco.Cms.Core.Manifest;

public class PackageManifest
{
    public required string Name { get; set; }

    public string? Id { get; set; }

    public string? Version { get; set; }

    public bool AllowPublicAccess { get; set; }

    public bool AllowTelemetry { get; set; } = true;

    [Obsolete("Use AllowTelemetry instead. This property will be removed in future versions.")]
    public bool AllowPackageTelemetry { get; set; } = true;

    public required object[] Extensions { get; set; }

    public PackageManifestImportmap? Importmap { get; set; }
}
