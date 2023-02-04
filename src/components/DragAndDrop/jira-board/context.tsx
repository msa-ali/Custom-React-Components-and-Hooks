import React, { createContext, useCallback, useState } from "react";
import { Dictionary } from "lodash";
import jiraIssues from "./data";
import { JiraIssue, JiraIssueStatus } from "./type";


type UpdateIssueStatus = ((id: string, status: JiraIssueStatus) => void) | null;

export const JiraIssueContext = createContext<Dictionary<JiraIssue>>({});
export const JiraIssueUpdaterContext = createContext<UpdateIssueStatus>(null);

const JiraIssueProvider = ({ children }: { children: React.ReactNode }) => {
    const [issues, setIssues] = useState(jiraIssues);

    const updateIssueStatus = useCallback((id: string, status: JiraIssueStatus) => {
        setIssues(issues => ({
            ...issues,
            [id]: {
                ...issues[id],
                status,
            }
        }));
    }, []);

    return (
        <JiraIssueUpdaterContext.Provider value={updateIssueStatus}>
            <JiraIssueContext.Provider value={issues}>
                {children}
            </JiraIssueContext.Provider>
        </JiraIssueUpdaterContext.Provider>
    );
};

export default JiraIssueProvider;