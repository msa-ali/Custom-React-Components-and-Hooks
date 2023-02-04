import tw from "tailwind-styled-components";
import { JiraIssue } from "./type";

export type Props = JiraIssue & {};

const Avatar = tw.div`
    p-3
    w-4
    h-4
    rounded-full
    flex
    justify-center
    items-center
    bg-blue-300 
    text-blue-700
`;



const TagStyledComponent = tw.span`
    inline-block 
    bg-purple-200 
    rounded-full 
    px-3 
    py-1 
    text-xs 
    font-semibold 
    text-purple-700 
    mr-2 
    mb-2
    uppercase
`;



const JiraCard = ({ title, tags, id, user }: Props) => {
    return (
        <div key={id} className="max-w-sm p-2 rounded overflow-hidden shadow-xl bg-white">
            <div className="p-4 flex flex-col justify-around items-start gap-4">
                <div className=" text-lg">{title}</div>
                <div>
                    {tags.map(tag => (
                        <TagStyledComponent key={tag}>{tag}</TagStyledComponent>
                    ))}
                </div>
                <div className="flex justify-between w-full">
                    <div className=" font-semibold text-gray-400">{id}</div>
                    <Avatar>{user?.charAt(0) ?? "U"} </Avatar>
                </div>
            </div>
        </div>
    );
}

export default JiraCard;