{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch Remote (Edge)",
            "type": "msedge",
            "request": "launch",
            "url": "https://teams.microsoft.com/?clientexperience=t2&${account-hint}#l/app/${{TEAMS_APP_ID}}?installAppPackage=true&webjoin=true",
            "presentation": {
                "group": "3-remote",
                "order": 1
            },
            "internalConsoleOptions": "neverOpen"
        },
        {
            "name": "Launch Remote (Chrome)",
            "type": "chrome",
            "request": "launch",
            "url": "https://teams.microsoft.com/?clientexperience=t2&${account-hint}#l/app/${{TEAMS_APP_ID}}?installAppPackage=true&webjoin=true",
            "presentation": {
                "group": "3-remote",
                "order": 2
            },
            "internalConsoleOptions": "neverOpen"
        },
        {
            "name": "Launch App (Edge)",
            "type": "msedge",
            "request": "launch",
            "url": "https://teams.microsoft.com/?clientexperience=t2&${account-hint}#l/app/${{local:TEAMS_APP_ID}}?installAppPackage=true&webjoin=true",
            "cascadeTerminateToConfigurations": [
                "Attach to Local Service"
            ],
            "presentation": {
                "group": "all",
                "hidden": true
            },
            "internalConsoleOptions": "neverOpen"
        },
        {
            "name": "Launch App (Chrome)",
            "type": "chrome",
            "request": "launch",
            "url": "https://teams.microsoft.com/?clientexperience=t2&${account-hint}#l/app/${{local:TEAMS_APP_ID}}?installAppPackage=true&webjoin=true",
            "cascadeTerminateToConfigurations": [
                "Attach to Local Service"
            ],
            "presentation": {
                "group": "all",
                "hidden": true
            },
            "internalConsoleOptions": "neverOpen"
        },
        {
            "name": "Attach to Local Service",
            "type": "node",
            "request": "attach",
            "port": 9239,
            "restart": true,
            "presentation": {
                "group": "all",
                "hidden": true
            },
            "internalConsoleOptions": "neverOpen"
        }
    ],
    "compounds": [
        {
            "name": "Debug in Teams (Edge)",
            "configurations": [
                "Launch App (Edge)",
                "Attach to Local Service"
            ],
            "preLaunchTask": "Start Teams App Locally",
            "presentation": {
{{#enableTestToolByDefault}}
                "group": "2-local",
{{/enableTestToolByDefault}}
{{^enableTestToolByDefault}}
                "group": "1-local",
{{/enableTestToolByDefault}}
                "order": 1
            },
            "stopAll": true
        },
        {
            "name": "Debug in Teams (Chrome)",
            "configurations": [
                "Launch App (Chrome)",
                "Attach to Local Service"
            ],
            "preLaunchTask": "Start Teams App Locally",
            "presentation": {
{{#enableTestToolByDefault}}
                "group": "2-local",
{{/enableTestToolByDefault}}
{{^enableTestToolByDefault}}
                "group": "1-local",
{{/enableTestToolByDefault}}
                "order": 2
            },
            "stopAll": true
        },
        {
            "name": "Debug in Test Tool (Preview)",
            "configurations": [
                "Attach to Local Service"
            ],
            "preLaunchTask": "Start Teams App (Test Tool)",
            "presentation": {
{{#enableTestToolByDefault}}
                "group": "1-local",
{{/enableTestToolByDefault}}
{{^enableTestToolByDefault}}
                "group": "2-local",
{{/enableTestToolByDefault}}
                "order": 1
            },
            "stopAll": true
        }
    ]
}
