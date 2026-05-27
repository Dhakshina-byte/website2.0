// src/components/WithCard.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowRight,
  Bookmark,
  Clock,
  Award,
  Code,
  Wrench,
} from "lucide-react";

const certificationsData = [
  { title: "Decision Making in working context", issuer: "Infomate (Pvt) Ltd - John Keells Holdings", date: "Aug 2025", skills: "Decision-Making · Business Decision Making" },
  { title: "Written Communication", issuer: "Infomate (Pvt) Ltd - John Keells Holdings", date: "Jul 2025", skills: "Written Communication · Email Strategy · Email Clients" },
  { title: "Client Relationship Management", issuer: "Infomate (Pvt) Ltd - John Keells Holdings", date: "Jun 2025", skills: "Customer Relationship Management (CRM) · Client Relationship Management" },
  { title: "Build RAG Chatbot with Python", issuer: "LetsUpgrade", id: "LUERCBMAY125614", skills: "Python (Programming Language) · Rag" },
  { title: "Google Cloud Technical Series", issuer: "Google", date: "Apr 2025", id: "7bb25025-77e7-470f-aa41-4026c165113b#acc.mG21Q6TS", skills: "Application Development and Security · Data Infrastructure" },
  { title: "Introduction to CIP", issuer: "OPSWAT Academy", date: "Feb 2025 · Expired Jan 2026", id: "_yq65JtJYg" },
  { title: "OPSWAT Cybersecurity Fundamentals Associate", issuer: "OPSWAT Academy", date: "Apr 2024", id: "98qyhVyXYA" },
  { title: "Mastering the GitHub Student Developer Pack", issuer: "Microsoft Learn Student Ambassadors India", date: "Feb 2025", skills: "GitHub" },
  { title: "GenAI 101 with Pieces", issuer: "Pieces", date: "Feb 2025", id: "QYlHymwQTuejF0XzJFk-Aw", skills: "Pieces" },
  { title: "Postman API Fundamentals Student Expert", issuer: "Canvas Credentials (Badgr)", date: "Feb 2025", id: "67aa4d4e2cc1234a568a595d" },
  { title: "Introduction to Cybersecurity", issuer: "Cisco", date: "Feb 2022", id: "3d764f5a-e0e8-461c-9b61-24f7329e9baf", skills: "Introduction to Cyber security" },
  { title: "Mastering Azure: Elevate Your Cloud Expertise!", issuer: "Microsoft Learn Student Ambassadors - Sri Lanka", date: "Aug 2024", skills: "Microsoft Azure" },
  { title: "Javascript Bootcamp", issuer: "LetsUpgrade", date: "Jan 2025", id: "LUEJSJAN125518", skills: "JavaScript" },
  { title: "Python Bootcamp", issuer: "LetsUpgrade", date: "Jan 2025", id: "LUEPYTJAN1251027", skills: "Programming · Python (Programming Language)" },
  { title: "Introduction to Career Skills in Data Analytics", issuer: "LinkedIn", date: "Feb 2025", id: "18688e2c549a3bbd50ac043e48b1521b6b563cea37f6e5fa7fb265a257963b3e", skills: "Tech Career Skills · Data Analytics" },
  { title: "UI/UX Designing - Figma Webinar", issuer: "Igniters", date: "Feb 2025", id: "40f7d9ea-d57d-42f7-9c0e-66efbcceb123", skills: "UI/UX Designing - Figma" },
];

function WithCard() {
  return (
    <Card className="w-full max-w-4xl mx-auto bg-black/40 backdrop-blur-sm border-white/10 text-white"> 
      <CardHeader>
      <CardTitle>Proffessional Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4 bg-white/50 border border-white/10 w-full h-auto flex-wrap justify-start sm:justify-center gap-1 p-1">
            <TabsTrigger value="overview">Experience</TabsTrigger>
            <TabsTrigger value="saved">Education</TabsTrigger>
            <TabsTrigger value="groups">Skills/Certifications</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="grid gap-4">
              <div>
                <h3 className="font-medium">Experience</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  My Experience section is a dynamic showcase of my professional journey, highlighting key milestones, skills, and achievements.
                </p>
              </div>
              <div className="grid gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="flex items-center justify-between p-2 -mx-2 hover:bg-white/5 rounded-md cursor-pointer transition-colors group">
                      <div className="flex items-center gap-4">
                        <Clock className="size-5 text-muted-foreground flex-shrink-0" />
                        <div className="text-left">
                          <div className="font-medium text-sm sm:text-base group-hover:text-white transition-colors text-white/90">PROCESS ASSOCIATE | May 2025 — Current</div>
                          <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">INFOMATE (PVT) LIMITED – JOHN KEELLS HOLDINGS - Colombo, Sri Lanka</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="pointer-events-none flex-shrink-0">
                        <ArrowRight className="size-4 text-muted-foreground group-hover:text-white transition-colors" />
                      </Button>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="bg-[#0a0a0a] border-white/10 text-white w-[95vw] max-w-[95vw] sm:max-w-[600px] max-h-[85vh] overflow-y-auto rounded-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-lg sm:text-xl tracking-wide text-white">PROCESS ASSOCIATE</DialogTitle>
                      <DialogDescription className="text-white/50">
                        INFOMATE (PVT) LIMITED – JOHN KEELLS HOLDINGS<br/>
                        May 2025 — Current | Colombo, Sri Lanka
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 mt-4 text-sm leading-relaxed text-white/70">
                      <p>
                        <strong className="text-white/90">Process Automation Management (Esker):</strong> Leverage the Esker Automation Platform to manage high volume transactional workflows, utilizing its AI-driven data capture (OCR) to minimize manual intervention and ensure 99.8% data accuracy.
                      </p>
                      <p>
                        <strong className="text-white/90">Corporate Compliance (ISO 27001):</strong> Operate within a strict Information Security framework, demonstrating a professional commitment to data confidentiality, privacy standards, and corporate governance essential for enterprise IT environments.
                      </p>
                      <p>
                        <strong className="text-white/90">SLA Management:</strong> Consistently meet and exceed aggressive Service Level Agreements (SLAs), prioritizing tasks under pressure in a fast-paced shared services environment.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="saved">
            <div className="grid gap-4">
              <div>
                <h3 className="font-medium">Education</h3>
                <p className="text-muted-foreground">
                </p>
              </div>
              <div className="grid gap-2">
                <div className="flex items-start gap-4 p-2 -mx-2 hover:bg-white/5 rounded-md transition-colors">
                  <Bookmark className="size-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <div className="font-medium text-sm sm:text-base text-white/90">HND in Computing and Software Engineering</div>
                    <div className="text-xs sm:text-sm text-muted-foreground mt-1">ICBT Campus - Colombo 04 | 2025 - 2027</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-2 -mx-2 hover:bg-white/5 rounded-md transition-colors">
                  <Bookmark className="size-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <div className="font-medium text-sm sm:text-base text-white/90">Certificate in Software Engineering</div>
                    <div className="text-xs sm:text-sm text-muted-foreground mt-1">National Institute of Business Management (NIBM) - Colombo 07 | 2023 - 2023</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-2 -mx-2 hover:bg-white/5 rounded-md transition-colors">
                  <Bookmark className="size-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <div className="font-medium text-sm sm:text-base text-white/90">G.C.E. Advanced Level / Physical Science (Focus on ICT).</div>
                    <div className="text-xs sm:text-sm text-muted-foreground mt-1">Asoka Vidyalaya - Colombo 10 | 2021 - 2023</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="groups">
            <div className="grid gap-6">
              <div>
                <h3 className="font-medium mb-3 text-lg">Skills</h3>
                <div className="grid gap-2">
                  <div className="flex items-start gap-3 p-2 bg-white/5 rounded-md">
                    <Code className="size-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm text-white/90">Languages - C# (Advanced), Java, Python, SQL, C/C++,React</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2 bg-white/5 rounded-md">
                    <Code className="size-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm text-white/90">Frameworks -NET Framework 4.7.2</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2 bg-white/5 rounded-md">
                    <Wrench className="size-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm text-white/90">Tools & Platforms - Visual Studio 2022, VS Code, Git, AWS (Foundational), Azure</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3 text-lg">Certifications and Licenses</h3>
                <div className="grid gap-2 max-h-[120px] overflow-y-auto pr-2">
                  {certificationsData.map((cert, idx) => (
                    <Dialog key={idx}>
                      <DialogTrigger asChild>
                        <div className="flex items-center justify-between p-2 -mx-2 hover:bg-white/5 rounded-md cursor-pointer transition-colors group">
                          <div className="flex items-center gap-4">
                            <Award className="size-5 text-muted-foreground flex-shrink-0" />
                            <div className="text-left">
                              <div className="font-medium text-sm sm:text-base group-hover:text-white transition-colors text-white/90 truncate max-w-[200px] sm:max-w-[400px]">
                                {cert.title}
                              </div>
                              <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">{cert.issuer}</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="pointer-events-none flex-shrink-0">
                            <ArrowRight className="size-4 text-muted-foreground group-hover:text-white transition-colors" />
                          </Button>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="bg-[#0a0a0a] border-white/10 text-white w-[95vw] max-w-[95vw] sm:max-w-[500px] rounded-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-lg sm:text-xl tracking-wide text-white">{cert.title}</DialogTitle>
                          <DialogDescription className="text-white/50 mt-2">
                            {cert.issuer}
                            {cert.date && <><br/>Issued: {cert.date}</>}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-3 mt-4 text-sm leading-relaxed text-white/70">
                          {cert.id && <p><strong className="text-white/90">Credential ID:</strong> <span className="break-all">{cert.id}</span></p>}
                          {cert.skills && <p><strong className="text-white/90">Skills:</strong> {cert.skills}</p>}
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default WithCard;