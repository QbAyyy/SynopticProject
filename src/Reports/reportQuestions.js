// export const questions = [
//     //Transparency and Lawfulness
//     "Does the privacy policy clearly identify the data controller and provide contact details?",
//     "Is the purpose of data processing clearly stated and justified within the policy?",
//     //Purpose Limitation
//     "Are the specific purposes for processing personal data clearly defined and limited?",
//     "Is there a clear explanation of how collecting personal data serves these purposes?",
//     //Data Minimization
//     "Does the policy ensure that only the necessary personal data for the specified purposes are collected and processed?",
//     //Accuracy
//     "Are there mechanisms in place to ensure that personal data is kept accurate and up-to-date?",
//     //Storage Limitation
//     "Does the policy specify the retention period for personal data",
//     "If so, is it limited to what is necessary for the purposes for which they are processed?",
//     //Integrity and Confidentiality
//     "What security measures are described to protect personal data against unauthorized or unlawful processing and against accidental loss, destruction, or damage?",
//     //Data subject Rights
//     "Does the policy clearly outline the rights of data subjects, including the right to access, correct, delete, or restrict the processing of their personal data?",
//     "Is the process for data subjects to exercise their rights clearly explained and accessible?",
//     //Automated Decision making/profiling
//     "Does the policy address the use of automated decision-making and profiling, and if so, does it explain the logic involved and its significance and consequences for the data subject?",
//     "If the smart cameras use facial recognition or other biometric profiling, how is this addressed in the policy? Are individuals informed about the use of such technologies?",
//     //Consent
//     "How does the policy address the issue of consent for collecting data through smart cameras, particularly in areas where individuals may not have a choice in being observed?",
//     "If applicable, does the policy describe the process for obtaining consent from the data subjects for processing their personal data, and is it clear that they can withdraw their consent at any time?",
//     //Notification of data breaches
//     "Is there a clear procedure for notifying the supervisory authority and affected data subjects in case of a data breach?",
//     //Data Protection Officer 
//     "If a Data Protection Officer is required, does the policy provide details about the DPO, including contact information?",


//     // Add more questions as needed
// ];

export const questions = [
    {
        question: "Does the privacy policy clearly identify the data controller and provide contact details?",
        answers: [
            "Yes, the data controller is clearly identified with full contact details.",
            "Partially, the data controller is identified, but contact details are incomplete.",
            "Vaguely, the data controller is somewhat identified, but lacks clear contact details.",
            "No, the data controller and contact details are not provided."
        ]
    },
    {
        question: "Is the purpose of data processing clearly stated and justified within the policy?",
        answers: [
            "Yes, the purpose is clearly stated, justified, and aligned with GDPR requirements.",
            "Partially, the purpose is stated but not fully justified or clear.",
            "Vaguely, the purpose is mentioned but lacks justification and clarity.",
            "No, the purpose of data processing is not stated or justified."
        ]
    },
    {
        question: "Are the specific purposes for processing personal data clearly defined and limited?",
        answers: [
            "Yes, specific purposes are clearly defined and limited as per GDPR.",
            "Partially, purposes are defined but not clearly limited.",
            "Vaguely, purposes are mentioned but not well-defined or limited.",
            "No, purposes are not defined or limited."
        ]
    },
    {
        question: "Is there a clear explanation of how collecting personal data serves these purposes?",
        answers: [
            "Yes, there is a clear explanation of how data collection serves the purposes.",
            "Partially, there is an explanation, but it is not very clear.",
            "Vaguely, the explanation of data collection is incomplete or unclear.",
            "No, there is no explanation of how data collection serves the purposes."
        ]
    },
    {
        question: "Does the policy ensure that only the necessary personal data for the specified purposes are collected and processed?",
        answers: [
            "Yes, the policy ensures only necessary data for specified purposes are collected.",
            "Partially, the policy mentions data minimization but lacks detail.",
            "Vaguely, there is some reference to data minimization, but it is unclear.",
            "No, there is no mention of data minimization."
        ]
    },
    {
        question: "Are there mechanisms in place to ensure that personal data is kept accurate and up-to-date?",
        answers: [
            "Yes, there are clear mechanisms to keep data accurate and up-to-date.",
            "Partially, some mechanisms are mentioned but not thoroughly detailed.",
            "Vaguely, there is a reference to accuracy, but mechanisms are unclear.",
            "No, there are no mechanisms mentioned for ensuring data accuracy."
        ]
    },
    {
        question: "Does the policy specify the retention period for personal data",
        answers: [
            "Yes, the retention period is specified and limited to necessary purposes.",
            "Partially, the retention period is mentioned but not clearly limited.",
            "Vaguely, there is some reference to retention, but details are unclear.",
            "No, the retention period is not specified or limited."
        ]
    },
    {
        question: "What security measures are described to protect personal data against unauthorized or unlawful processing and against accidental loss, destruction, or damage?",
        answers: [
            "Yes, comprehensive security measures are described.",
            "Partially, some security measures are mentioned but not detailed.",
            "Vaguely, security measures are referenced but lack specifics.",
            "No, there is no mention of security measures."
        ]
    },
    {
        question: "Does the policy clearly outline the rights of data subjects, including the right to access, correct, delete, or restrict the processing of their personal data?",
        answers: [
            "Yes, the rights are clearly outlined and the process to exercise them is accessible.",
            "Partially, rights are mentioned but the process is not fully clear.",
            "Vaguely, there is some reference to rights, but details on the process are lacking.",
            "No, the rights are not clearly outlined or the process is not mentioned."
        ]
    },
    {
        question: "Does the policy address the use of automated decision-making and profiling, and if so, does it explain the logic involved and its significance and consequences for the data subject?",
        answers: [
            "Yes, it's clearly addressed with detailed explanations of the logic and significance.",
            "Partially, it's mentioned but lacks detailed explanations.",
            "Vaguely, there is some reference, but it lacks clear explanations.",
            "No, there is no mention of automated decision-making or profiling."
        ]
    },
    {
        question: "If the smart cameras use facial recognition or other biometric profiling, how is this addressed in the policy? Are individuals informed about the use of such technologies?",
        answers: [
            "Yes, the use is clearly addressed, with detailed policies and individual notifications.",
            "Partially, the use is mentioned but policies or notifications are not detailed.",
            "Vaguely, there is some reference, but it lacks clear policies or notifications.",
            "No, there is no mention or clear policy on the use of such technologies."
        ]
    },
    {
        question: "How does the policy address the issue of consent for collecting data through smart cameras, particularly in areas where individuals may not have a choice in being observed?",
        answers: [
            "Yes, the policy clearly addresses consent with a clear withdrawal process.",
            "Partially, consent is mentioned but the process for withdrawal is not clear.",
            "Vaguely, consent is referenced but without clear details or withdrawal process.",
            "No, there is no mention of consent or the process for obtaining/withdrawing it."
        ]
    },
    {
        question: "Is there a clear procedure for notifying the supervisory authority and affected data subjects in case of a data breach?",
        answers: [
            "Yes, there is a clear procedure for notification of breaches.",
            "Partially, a notification procedure is mentioned but lacks detail.",
            "Vaguely, there is some reference to notification but it is unclear.",
            "No, there is no procedure for notifying data breaches."
        ]
    },
    {
        question: "If a Data Protection Officer is required, does the policy provide details about the DPO, including contact information?",
        answers: [
            "Yes, the DPO is clearly detailed with contact information.",
            "Partially, the DPO is mentioned but without full contact details.",
            "Vaguely, there is a reference to a DPO but without clear details.",
            "No, there is no mention of a DPO or contact information."
        ]
    }
];