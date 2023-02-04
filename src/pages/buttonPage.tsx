import { GoBell, GoDashboard } from 'react-icons/go';

import Button from "../components/button";

function ButtonPage() {
    return (
        <div className="flex justify-center items-center flex-col">

            <div className="mb-4 mt-4">
                <Button appearance="primary" onDoubleClick={() => console.log("Double clicked!!!")}>primary </Button>
            </div>
            <div className="mb-4">
                <Button appearance="secondary" onClick={() => console.log("clicked!!!")}>secondary</Button>
            </div>
            <div className="mb-4">
                <Button appearance="success">
                    <GoBell />
                    success
                </Button>
            </div>
            <div className="mb-4">
                <Button appearance="warning">warning</Button>
            </div>
            <div className="mb-4">
                <Button appearance="danger">danger</Button>
            </div>
            <div className="mb-4">
                <Button appearance="primary" outline>primary outline</Button>
            </div>
            <div className="mb-4">
                <Button appearance="primary" rounded>primary rounded</Button>
            </div>
            <div className="mb-4">
                <Button appearance="success" outline rounded>
                    <GoDashboard />
                    success outline
                </Button>
            </div>
            <div className="mb-4">
                <Button appearance="success" rounded >success rounded</Button>
            </div>
        </div>
    );
}

export default ButtonPage;
