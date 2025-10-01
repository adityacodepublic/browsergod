from crewai import LLM, Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai.agents.agent_builder.base_agent import BaseAgent
from typing import List

from server.tools.mcp import chrome_devtools_stdio_params
# If you want to run a snippet of code before or after the crew starts,
# you can use the @before_kickoff and @after_kickoff decorators
# https://docs.crewai.com/concepts/crews#example-crew-class-with-decorators


@CrewBase
class Server:
    """Server crew"""

    agents: List[BaseAgent]
    tasks: List[Task]

    # Configure MCP connections
    mcp_server_params = [
        # Chrome DevTools MCP via stdio using npx
        chrome_devtools_stdio_params(),
    ]

    # Default timeout for connecting to MCP servers (seconds)
    mcp_connect_timeout = 60

    # Learn more about YAML configuration files here:
    # Agents: https://docs.crewai.com/concepts/agents#yaml-configuration-recommended
    # Tasks: https://docs.crewai.com/concepts/tasks#yaml-configuration-recommended

    # If you would like to add tools to your agents, you can learn more about it here:
    # https://docs.crewai.com/concepts/agents#agent-tools
    @agent
    def operator(self) -> Agent:
        # Unified agent with navigation, interaction, and performance tools
        return Agent(
            config=self.agents_config["operator"],  # type: ignore[index]
            verbose=True,
            llm=LLM(
                model="gemini/gemini-2.0-flash",
                temperature=0.7,
            ),
            tools=self.get_mcp_tools(
                # Navigation
                "new_page",
                "list_pages",
                "select_page",
                "navigate_page",
                "navigate_page_history",
                "wait_for",
                "resize_page",
                "close_page",
                # Interaction & inspection
                "click",
                "drag",
                "hover",
                "fill",
                "fill_form",
                "upload_file",
                "handle_dialog",
                "evaluate_script",
                "list_console_messages",
                "list_network_requests",
                "get_network_request",
                "take_screenshot",
                "take_snapshot",
                # Performance & emulation
                "emulate_cpu",
                "emulate_network",
                "performance_start_trace",
                "performance_stop_trace",
                "performance_analyze_insight",
            ),
        )

    # To learn more about structured task outputs,
    # task dependencies, and task callbacks, check out the documentation:
    # https://docs.crewai.com/concepts/tasks#overview-of-a-task
    @task
    def research_task(self) -> Task:
        return Task(
            config=self.tasks_config["research_task"],  # type: ignore[index]
        )

    @task
    def reporting_task(self) -> Task:
        # Removed secondary task per single-agent single-task requirement
        return Task(
            config=self.tasks_config["research_task"],  # type: ignore[index]
        )

    @crew
    def crew(self) -> Crew:
        """Creates the Server crew"""
        # To learn how to add knowledge sources to your crew, check out the documentation:
        # https://docs.crewai.com/concepts/knowledge#what-is-knowledge

        return Crew(
            agents=self.agents,  # Automatically created by the @agent decorator
            tasks=self.tasks,  # Automatically created by the @task decorator
            process=Process.sequential,
            verbose=True,
            memory=True,
        )
