import { useContext, useMemo } from "react";

import { JiraIssueContext } from "./context";
import groupBy from "lodash.groupby";
import { JiraIssue, JiraIssueStatus } from "./type";
import JiraIssueList from "./jira-issue-list";
import { jiraIssueStatusList } from "./data";


const JiraBoard = () => {
    const issues = useContext(JiraIssueContext);

    const issuesByStatus = useMemo(() => {
        return groupBy(Object.values(issues), 'status') as Record<JiraIssueStatus, JiraIssue[]>;
    }, [issues]);

    return (
        <div className=" w-full flex items-center justify-around">
            {jiraIssueStatusList.map((status) =>  <JiraIssueList
                key={status}
                status={status}
                issues={issuesByStatus[status]}
            />
            )}
        </div>
    );
}

export default JiraBoard;