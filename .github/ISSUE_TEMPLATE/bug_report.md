name: "\U0001F41B Bug Report"
description: 'Report a reproducible bug in the react-native-vector-icons package'
body:
  - type: markdown
    attributes:
      value: Thanks for taking the time to file a bug report! Please fill out this entire form.
  - type: checkboxes
    attributes:
      label: I have searched open and closed issues for this issue.
      options:
        - label: I have searched open and closed issues.
          required: true
  - type: input
    attributes:
      label: Minimal reproducible example
      description: |
        A link to a GitHub repository containing a minimal reproducible example. This repository should include as little code as possible and not include extraneous dependencies.

        If a reproducible example is not provided, your issue may be closed.
        [Learn more about creating a minimal reproducible example](https://stackoverflow.com/help/mcve).
    validations:
      required: true
  - type: dropdown
    attributes:
      label: What platform(s) does this occur on?
      multiple: true
      options:
        - Android
        - iOS
        - web
    validations:
      required: true
  - type: textarea
    attributes:
      label: Summary
      description: |
        Explain the steps we need to take to reproduce the issue. Include a video or screenshots if you think it may help.
        Clearly describe what the expected behavior is and what instead is actually happening. Be concise and precise in your description. Include the affected platforms.
    validations:
      required: true
  - type: textarea
    attributes:
      render: text
      label: Your computer environment
      description: Run the `npx react-native info` command and paste its output in the field below.
    validations:
      required: true
