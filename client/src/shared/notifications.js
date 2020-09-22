import { message } from "antd";





export const successInfo = (msg) => {
    message.success({
        content: msg,
        className: "messageColor"

    });
}

export const warningInfo = (msg) => {
    message.warning({
        content: msg,
        className: "messageColor"
    });
};
