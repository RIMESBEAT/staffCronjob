import { Client, Databases, Query } from "node-appwrite";

// const FASTDB = process.env.FASTDB;
// const LOANDATA = process.env.LOANDATA;
// const PROJECT_ID = process.env.PROJECT_ID;

const PROJECT_ID = "6570e97d59a51670161b";
const STAFFDB = "6616e3c0bc01f963fe75";
const STAFFCOLLECTION = "6616e3de90aea0072240";

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject(PROJECT_ID);
  const database = new Databases(client);
  try {
    const response = await database.listDocuments(STAFFDB, STAFFCOLLECTION, [
      Query.select(["taskId", "$id"]),
    ]);

    const taskData = response.documents?.filter(
      (item) => item.taskId.length != 0
    );
    const getData = taskData.map((item) => ({
      taskid: item.taskId,
      id: item.$id,
    }));

    getData.map((data) => {
      const updateData = database.updateDocument(
        STAFFDB,
        STAFFCOLLECTION,
        data.id,
        {
          taskId: [],
        }
      );
    });
    log("UPDATE COMPLETE");
    return res.json({});
  } catch (error) {
    log(error, "An Error Occur while uodating user");

    return error;
  }
};
