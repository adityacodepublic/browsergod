import os

# Re-export for local, centralized MCP usage within the project
from mcp import StdioServerParameters  # noqa: F401

try:
    from crewai_tools import MCPServerAdapter  # noqa: F401
except Exception:
    MCPServerAdapter = None  # type: ignore


def chrome_devtools_stdio_params(command: str = "npx", args: list | None = None, env: dict | None = None) -> StdioServerParameters:
    """Convenience factory for Chrome DevTools MCP stdio parameters.

    Args:
        command: Executable to launch the MCP server (default: "npx").
        args: Arguments to pass to the command (default: ["chrome-devtools-mcp@latest"]).
        env: Environment variables to use; defaults to os.environ.

    Returns:
        StdioServerParameters instance ready to be used by CrewAI MCP integration.
    """
    if args is None:
        args = ["chrome-devtools-mcp@latest"]
    return StdioServerParameters(
        command=command,
        args=args,
        env={**(env or os.environ)},
    )


