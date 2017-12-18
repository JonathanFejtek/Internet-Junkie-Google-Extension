
jest.dontMock("../../app/Background/background.js");
jest.dontMock('moment');

const bgModule = require("../../app/Background/background.js");
const moment = require('moment');
//DOTO create Mocks and stubs if needed.
describe("test cases for extractDomain()", () =>{

    it("extracts domain from a string", () => {
        const testData = {
           url_1: "https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_split",
           url_2: "www.w3schools.com/jsref/tryit.asp?filename",
           url_3: "dfsdfsdfsdfsdfsdfsdfsdfsdfsdfgsdfsdfssdgsghs",
           url_4: undefined,
           url_5: "w3schools.com"
        }
        var expectedData = {};
        var result1 = bgModule.extractDomain(testData.url_1);
        var result2 = bgModule.extractDomain(testData.url_2);
        var result3 = bgModule.extractDomain(testData.url_3);
        var result4 = bgModule.extractDomain(testData.url_4);
        var result5 = bgModule.extractDomain(testData.url_5);
        expectedData ={
           url_1_result: result1,
           url_2_result: result2,
           url_3_result: result3,
           url_4_result: result4,
           url_5_result: result5
        };
        expect(expectedData).toEqual({
            url_1_result: "w3schools.com",
            url_2_result: "w3schools.com",
            url_3_result: "",
            url_4_result: "",
            url_5_result: "w3schools.com"

        });
    });
});
describe("test cases for search()", () =>{

    it("checks if website exists in global website list", () => {
        const testWebsite = "w3schools.com";
        const testWebsiteList = [
          [],
          [{websiteName: "facebook.com"}],
          [{websiteName: "facebook.com"}, {websiteName: "stackoverflow.com"}, {websiteName: "github.com"}],
          [{websiteName: "facebook.com"}, {websiteName: "stackoverflow.com"}, {websiteName: "w3schools.com"}]
        ];

        var results = [];

        for (var i = 0; i < testWebsiteList.length; i++) {
          bgModule.websiteList = testWebsiteList[i];
          results.push(bgModule.search(testWebsite));
        }

        var expectedData ={
           search_1_result: results[0],
           search_2_result: results[1],
           search_3_result: results[2],
           search_4_result: results[3]
        };
        expect(expectedData).toEqual({
            search_1_result: null,
            search_2_result: null,
            search_3_result: null,
            search_4_result: {websiteName: "w3schools.com"},

        });
    });
});
describe("test cases for blackListCheck()", () =>{

    it("checks if website exists in blacklist", () => {
        const testWebsite = "https://badwebsite.com";
        const testBlacklist = [
          [],
          ["newtab", "www.google.", "chrome://", "localhost", "chrome-extension://"],
          ["newtab", "www.google.", "chrome://", "localhost", "chrome-extension://", "badwebsite.com"]
        ];

        var results = [];

        for (var i = 0; i < testBlacklist.length; i++) {
          bgModule.blackList = testBlacklist[i];
          results.push(bgModule.blackListCheck(testWebsite));
        }

        var expectedData ={
           search_1_result: results[0],
           search_2_result: results[1],
           search_3_result: results[2]
        };
        expect(expectedData).toEqual({
            search_1_result: false,
            search_2_result: false,
            search_3_result: true
        });
    });
});
describe("test cases for updateDeactivationTime()", () =>{
    it("checks if deactivation time was updated correctly", () => {
      const testWebsiteList = [
         {
           websiteName: "scott.mn",
           favIcon: "https://scott.mn/favicon.ico",
           websiteVisits: 5,
           startTime: "2017-10-02T15:50:40-04:00",
           deactivationTime: "2017-10-02T15:49:43-04:00"
         },
         {
           websiteName: "stackoverflow.com",
           favIcon: "https://scott.mn/favicon.ico",
           websiteVisits: 5,
           startTime: "2017-10-02T15:49:40-04:00",
           deactivationTime: "2017-10-02T15:49:43-04:00"
         },
         {websiteName: "w3schools.com"}
        ]
        const testExistingWebsite = testWebsiteList[0];
        var deactivationTime = "2017-10-02T15:51:40-04:00";
        var duration = moment.duration(moment(deactivationTime).diff(testExistingWebsite.startTime));
        testExistingWebsite.timeDifference = duration;
        expect(testExistingWebsite.timeDifference._data.minutes).toEqual(1);
    });
});
describe("test cases for tabUpdatedAndActive()", () =>{
    it("checks if tab was updated correctly", () => {
      const testWebsiteList = [
         {
           websiteName: "scott.mn",
           favIcon: "https://scott.mn/favicon.ico",
           websiteVisits: 5,
           startTime: "2017-10-02T15:50:40-04:00",
           deactivationTime: "2017-10-02T15:49:43-04:00"
         },
         {
           websiteName: "stackoverflow.com",
           favIcon: "https://scott.mn/favicon.ico",
           websiteVisits: 5,
           startTime: "2017-10-02T15:49:40-04:00",
           deactivationTime: "2017-10-02T15:49:43-04:00"
         },
         {websiteName: "w3schools.com"}
        ]

      expect(testWebsiteList.length).toEqual(3);
    });
});
