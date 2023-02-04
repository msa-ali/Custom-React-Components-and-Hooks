import tw from "tailwind-styled-components";
import JiraBoard from "../components/DragAndDrop/jira-board";
import JiraIssueProvider from "../components/DragAndDrop/jira-board/context";

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