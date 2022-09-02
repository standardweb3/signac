import "source-map-support/register";
declare class SignacConfig {
    [key: string]: any;
    constructor({ dir }: {
        dir?: string | undefined;
    });
    eventManagerOptions(config: SignacConfig): any;
    static default(dir: any): SignacConfig;
}
export default SignacConfig;
