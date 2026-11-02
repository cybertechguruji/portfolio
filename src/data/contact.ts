export interface ContactInfo {
  email: string;
  web3FormsAccessKey: string;
  location: string;
  availability: string;
  socials: {
    linkedin: string;
    github: string;
    instagram: string;
    youtube: string;
    twitter: string;
  };
}

export const contactInfo: ContactInfo = {
  // Official email address
  email: "cakram00@gmail.com",

  // To receive form emails directly in your inbox:
  // 1. Visit https://web3forms.com
  // 2. Enter your email (cakram00@gmail.com)
  // 3. Paste the access key they email you right below:
  web3FormsAccessKey: "7a654649-68d0-4414-bf64-3f9ef98984e4",

  // Location and status
  location: "India • Available for Remote Worldwide",
  availability: "Open to Full-time Roles & Analytics Projects",

  // Your Social & Professional Links - edit these anytime!
  socials: {
    linkedin: "https://www.linkedin.com/in/cybertechguruji/",
    github: "https://github.com/cybertechguruji",
    instagram: "https://www.instagram.com/cybertechguruji2/",
    youtube: "https://www.youtube.com/@CyberTechGuruji",
    twitter: "https://x.com/cybertechguruji",
  },
};
