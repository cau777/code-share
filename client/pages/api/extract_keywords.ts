import type {NextApiRequest, NextApiResponse} from "next"
import axios from "axios";

type Data = {
    name: string
}

const Url = "https://code-share-key-terms-extractor.livelybay-b5b6ca38.brazilsouth.azurecontainerapps.io/extract";
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    axios.post(Url, req.body).then(o => res.status(o.status).json(o.data));
}
