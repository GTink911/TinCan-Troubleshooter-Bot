import { scenarioFile } from "./interfaces";

export function isScenarioFile(scenarioFile: unknown): scenarioFile is scenarioFile {
    const testedFile = scenarioFile as scenarioFile;
    return testedFile.ScenarioName !== null && testedFile.UploadedBy !== null && testedFile.CreatedDate !== null;
}