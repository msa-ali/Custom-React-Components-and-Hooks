export type JiraIssueStatus = "TODO" | "IN PROGRESS" | "IN REVIEW" | "DONE";

export const JiraIssueStatusList: JiraIssueStatus[] = ["TODO", "IN PROGRESS", "IN REVIEW", "DONE"]

export type JiraIssue = {
    title: string;
    tags: string[];
    id: string;
    status: JiraIssueStatus;
    user?: string;
}