import { fetchAuthSession } from "aws-amplify/auth";

async function checkUser(updateUser) {
  try {
        const userData = await fetchAuthSession();

        if (!userData.token) {
        console.log("userData: ", userData);
        updateUser({});
        return;
        }

        const {
        accessToken: { payload }} = userData.token;
        console.log("payload: ", payload);
        
        const isAuthorized =
        payload["cognito:groups"] && 
        payload["cognito:groups"].includes("Admin");
        updateUser({
        username: payload["cognito:username"],
        isAuthorized,
        });
    } catch (error) {
        console.error("checkuser failed", error);
  }
}

export default checkUser;
