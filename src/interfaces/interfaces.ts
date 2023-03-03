interface projectResponseData {
    id: number;
    gitUrl: string;
    sha : string;
    owner: string;
    name: string;
    directory: string;
    files: projectFileResponseData[];
    totalCoverage: number;
    totalMiss: number;
    totalStmts: number;

}

interface projectFileResponseData {
    id: number;
    first_file: string;
    name: string;
    stmts: number;
    miss: number;
    coverage: number;
    comments: commentResponseData[];
    rating: number;
    previousRating: number;
    project: projectResponseData;
    projectName: string;
}

interface commentResponseData {
    comment: string;
}