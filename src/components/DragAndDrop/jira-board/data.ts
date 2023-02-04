import _keyBy from 'lodash.keyby';

import { Props as JiraIssue } from './jira-card';

const data: JiraIssue[] = [
    {
        id: "TQT-1",
        title: "Update Node.js version to latest in all repos and validate the build",
        user: "Altamash",
        tags: ["Product Team", "KTLO", "Tech Dept"],
        status: "TODO"
    },
    {
        id: "TQT-2",
        title: "Update React version to latest in all repos and validate the build",
        tags: ["Product Team", "Frontend", "KTLO", "Tech Dept"],
        status: "TODO"
    },
    {
        id: "TQT-3",
        title: "Improve performance of the Review page by eliminating extra re-renders",
        tags: ["Product Team", "Frontend", "KTLO", "Performance"],
        status: "IN PROGRESS"
    },
    {
        id: "TQT-4",
        title: "Fix crash bug",
        user: "Altamash",
        tags: ["Bug", "Critical"],
        status: "IN PROGRESS"
    },
    {
        id: "TQT-5",
        title: "Build Toggle feature",
        tags: ["Product Team", "Frontend", "feature"],
        status: "DONE"
    },
    {
        id: "TQT-6",
        title: "Increase Unit test coverage and add e2e tests",
        tags: ["Product Team", "Frontend", "testing"],
        status: "DONE"
    }
];

const jiraIssues = _keyBy(data, 'id');

export default jiraIssues;