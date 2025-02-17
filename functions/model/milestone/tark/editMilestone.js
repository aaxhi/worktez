/* eslint-disable linebreak-style */
/* eslint-disable valid-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/
const {getMilestoneData, updateMilestone} = require("../lib");

exports.editMilestone = function(request, response) {
  const milestoneStatus = request.body.data.MilestoneStatus;
  const orgDomain = request.body.data.OrgDomain;
  const milestoneId = request.body.data.MilestoneId;
  const title = request.body.data.Title;
  const description = request.body.data.Description;
  const startDate = request.body.data.StartDate;
  const endDate = request.body.data.EndDate;

  let result;
  let status = 200;

  const promise = getMilestoneData(orgDomain, milestoneId).then((milestoneData) => {
    if (milestoneData == undefined) {
      result = {data: {status: "Milestone does not exist"}};
    } else {
      const inputJson = {
        Title: title,
        Description: description,
        MilestoneStatus: milestoneStatus,
        StartDate: startDate,
        EndDate: endDate,
      };
      updateMilestone(inputJson, orgDomain, milestoneId);
    }
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });

  Promise.resolve(promise).then(() => {
    result = {data: {status: "OK"}};
    console.log("milestone edited Successfully");
    return response.status(status).send(result);
  })
      .catch((error) => {
        result = {data: error};
        console.error("Error editing Filter", error);
        return response.status(status).send(result);
      });
};
