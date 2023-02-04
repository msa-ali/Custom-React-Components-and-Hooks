import { useContext, useMemo, useRef } from "react";
import { JiraIssue, JiraIssueStatus } from "./type";
import JiraCard from "./jira-card";
import tw from "tailwind-styled-components";
import useDropTarget, { DropTargetEventHandlers } from "../../../hooks/use-drop-target";
import { JiraIssueUpdaterContext } from "./context";

export type Props = {
    status: JiraIssueStatus;
    issues: JiraIssue[];
}

interface ContainerProps {
    $isDraggingover: boolean;
}

const Container = tw.div<ContainerProps>`
    p-2 
    flex
    flex-col 
    gap-2 
    bg-gray-100
    min-w-[300px] 
    min-h-screen
    ${props => props.$isDraggingover ? "border-4" : "border-0"}
`;


const JiraIssueList = ({ status, issues }: Props) => {
    const ref = useRef<HTMLDivElement>(null);

    const updateJiraIssueStatus = useContext(JiraIssueUpdaterContext);
    
    const numberOfIssues = `${issues?.length ?? 0} ${(issues?.length ?? 0) > 1 ? "issues" : "issue"}`;

    const dropConfig: DropTargetEventHandlers = useMemo(() => ({
        drop(event) {
            if (event.dataTransfer && updateJiraIssueStatus) {
                const jiraId = event.dataTransfer?.getData("jiraIssueId");
                updateJiraIssueStatus(jiraId, status);
            }
            
        },
    }), [status]);

    const isDragOver = useDropTarget(ref, dropConfig);

    const renderedIssues = useMemo(() => {
        return issues && issues.map(issue =>
            <JiraCard
                key={issue.id}
                {...issue}
            />
        )
    }, [issues]);

    return (
        <Container key={status} ref={ref} $isDraggingover={isDragOver}>
            <div className="font-semibold text-gray-400 uppercase mb-4 p-2">
                <span>{status}</span>
                <span className="ml-2">{numberOfIssues}</span>
            </div>

            {renderedIssues}

        </Container>
    );
};

export default JiraIssueList;