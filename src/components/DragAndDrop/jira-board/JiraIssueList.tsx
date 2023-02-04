import { memo } from "react";
import { JiraIssue, JiraIssueStatus } from "./type";
import JiraCard from "./jira-card";

export type Props = {
    status: JiraIssueStatus;
    issues: JiraIssue[];
}


const JiraIssueList = ({ status, issues }: Props) => {
    const numberOfIssues = `${issues.length} ${issues.length > 0 ? "issues" : "issue"}`;

    return (
        <div key={status} className="p-2 flex flex-col gap-2 bg-gray-100 min-h-screen">
            <div className="font-semibold text-gray-400 uppercase mb-4 p-2">
                <span>{status}</span>
                <span className="ml-2">{numberOfIssues}</span>
            </div>

            {issues.map(issue =>
                <JiraCard
                    key={issue.id}
                    {...issue}
                />
            )
            }

        </div>
    );
};

export default memo(JiraIssueList);