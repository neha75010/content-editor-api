import { serialize, parse } from "cookie";
import randomID from "../functions/randomID.js";

export default function initialHeaders (headers, { socket, headers : { cookie = "" } }) {
    let uid = parse(cookie)?.["scope-hit-on_client-id"]
    uid ??= randomID();

    headers["set-cookie"] = serialize("scope-hit-on_client-id", uid, { sameSite: "strict" });
}