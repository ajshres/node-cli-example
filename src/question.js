const questions = [
    {
        message: "Select version of react cli",
        name: "name",
        choices:[
            "React", "React with Typescript",

        ],
        type:"input",
        default: "my-app",
    },
    {
        message: "Select version of react cli",
        name: "React",
        choices:[
            "React", "React with Typescript",

        ],
        type:"list",
        default: "React with Typescript",
    }, {
        message: "Select library",
        name: "React State Library",
        choices:[
            "Redux", "MobX", "None"

        ],
        type:"list",
        default: "Redux",
    }, {
        message: "Select for redux",
        name: "Redux",
        choices:[
            "Redux with Saga", "Redux with Thunk", "None"

        ],
        type:"list",
        default: "None",
        when: (answers) => answers["React State Library"] === "Redux"
    },
  ];

module.exports = questions;