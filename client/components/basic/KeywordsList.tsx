import {FC} from "react";

type Props = {
    keywords: string[]
}

// Flex list of keywords
const KeywordsList: FC<Props> = (props) => {
    return (
        <div className={"rounded-lg flex gap-2 flex-wrap"}>
            {props.keywords.map(o => (
                <div className={"rounded-lg bg-primary-900 text-primary-50 text-sm px-2 py-0.5 whitespace-nowrap"} key={o}>
                    {o}
                </div>
            ))}
        </div>
    )
}

export default KeywordsList;