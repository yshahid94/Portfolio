export class Experience {
    public Date: string;
    public Company: string;
    public Title: string;
    public Image: string;
    public Message: string;
    public Skills?: string[];

    constructor(date: string, company: string, title: string, image: string, message: string, skills?: string[]) {
        this.Date = date;
        this.Company = company;
        this.Title = title;
        this.Image = image;
        this.Message = message;
        this.Skills = skills;
    }
}