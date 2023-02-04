import tw from "tailwind-styled-components";
import JiraBoard from "../components/drag-and-drop/jira-board";
import JiraIssueProvider from "../components/drag-and-drop/jira-board/context";

const Container = tw.div`
    flex
    items-center
    justify-center
    flex-col
    w-full
`

const DragAndDropPage = () => {
    return (
        <Container>
            <JiraIssueProvider>
                <JiraBoard />
            </JiraIssueProvider>
        </Container>
    );
};

export default DragAndDropPage;