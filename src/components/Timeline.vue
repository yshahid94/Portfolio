<template>
     <div class="timeline">
        <div :key="index" v-for="(experience, index) in Experiences" :class="[index % 2 == 0 ? 'left': 'right', 'TLcontainer']">
            <div class="content">
                <img v-if="experience.Image != null" style="height:80px;" :src="require(`@/assets/${experience.Image}`)" alt="">
                <h4 v-else>{{ experience.Company }}</h4>
                <div class="date">
                    <div class="row">
                        <div class="col-md-6">{{ experience.Title }}</div>
                        <div class="col-md-6"><i class="far fa-calendar"></i> {{ experience.Date }}</div>
                    </div>
                </div>
                <p v-html="experience.Message"></p>
                <ul class="content-skills">
                    <li v-for="skill in experience.Skills" :key="skill"> {{ skill }}
                    </li>
                </ul>
            </div>
        </div>
    </div> 
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator";
import { Experience } from "@/types/Experience";

@Component
export default class Timeline extends Vue {
    Experiences: Experience[] = [];
    
    mounted() {
        this.Experiences.push({
            Date: "Feb 2021 – Current",
            Company: "Verastar",
            Title: "Senior Application Developer",
            Image: "verastar-logo-white.png",
            Message: "When I came back I was placed in the team handling all our new front end solutions which were being written in Vue at that point. I was part of integrating multiple third party APIs into our systems, and became a main contact point between us and those third party companies. I became responible for handling any outages or errors these APIs came across. At this point I've also led the team through multiple projects as an interim team lead when our team lead is on holiday or busy with other work, in these cases I've made sure to see the projects to their completion even if the team lead returned, as I felt it my responsibility to do so.",
            Skills: [
                    "Vue",
                    "C#",
                    "SQL",
                    "Javascript",
                    "Typescript",
                    "ASP.Net",
                    "CSS",
                    "TFS",
                    "MVC",
                    "jQuery",
                    "Bootstrap"
                    ]
        });
        this.Experiences.push({
            Date: "Jun 2018 – Feb 2020",
            Company: "Verastar",
            Title: "Senior Application Developer",
            Image: "verastar-logo-white.png",
            Message: "I now started mentoring any new developers joining my team and any having trouble in other teams, this included showing the ropes to new grads and generally helping new developers ease into the way the company operates and guide them with any queries they might have. I was also the one responsible for leading the team whenever the lead was not available. Being one of the most experienced in terms of business knowledge at this point I became an important contact throughout the whole business. Near the end of my career at Verastar we started to experiment with JavaScript frameworks and I tried my hand at Vue and React.",
            Skills: [
                    "C#",
                    "SQL",
                    "MVC",
                    "TFS",
                    "Vue",
                    "Typescript",
                    "ASP.Net",
                    "Javascript",
                    "jQuery",
                    "CSS",
                    "Bootstrap"
                    ]
        });
        this.Experiences.push({
            Date: "Dec 2016 – Jun 2018",
            Company: "Verastar",
            Title: "Application Developer",
            Image: "verastar-logo-white.png",
            Message: "During my transition out of graduate application developer I focused on becoming more independent and deepening my domain knowledge. I started on learning how the company operated and how to best align myself to fit into its structure. During this stage the company started to adopt several practices from the Agile methodology including SCRUM events, poker planning and backlogs. I was part of introducing a new ESB product to the company which is used as a middleware for all inhouse products and any external clients.",
            Skills: [
                    "C#",
                    "SQL",
                    "MVC",
                    "SOAP APIs",
                    "TFS",
                    "ASP.Net",
                    "Javascript",
                    "jQuery",
                    "Webforms",
                    "CSS",
                    "Bootstrap"
                    ]
        });
        this.Experiences.push({
            Company: "Verastar",
            Date: "Nov 2015 – Dec 2016",
            Title: "Graduate Application Developer",
            Image: "verastar-logo-white.png",
            Message: "During my first year of employment I focused on learning how to work within a team of developers and trying to soak in all the information I could from the people around me. In terms of software I learnt how to use TFS to keep track of the team’s workload and handling version control, ways to utilise Bootstrap to create responsive frontends, the basics of SQL and keeping a database normalized. During this time, I focused a lot more on working through tasks maintaining old code to learn existing processes and build my business knowledge.",
            Skills: [
                    "C#",
                    "SQL",
                    "Webforms",
                    "MVC",
                    "TFS",
                    "ASP.Net",
                    "Javascript",
                    "jQuery",
                    "CSS",
                    "Bootstrap"
                    ]
        });
        this.Experiences.push({
            Company: "MMU",
            Date: "Nov 2012 – Dec 2015",
            Image: "mmu_new_logo_white.png",
            Title: "B.Sc. (Hons) Computer Science – First Class Honours Degree (1st)",
            Message: `Third Year Modules: Software Architecture (65%),
            Human Computer Interaction (80%),<br/>
            Enterprise Programming (62%),
            Project (62%)<br/><br/>
            Second Year Modules: Professional Development (76%),<br/>Computer Networks and operating systems (82%)<br/>
            Algorithms and Data Structures (86%), Advanced Programming (78%)<br/><br/>
            First Year Modules: Programming (73%), Computer Systems Fundamentals (94%),<br/>
            Information Systems (63%), Web and Multimedia (78%)`
        });
    }
}

</script>

<style scoped>
    

    /* The actual timeline (the vertical ruler) */
    .timeline {
        position: relative;
        max-width: 1800px;
        margin: 0 auto;
        padding: 3em 0px;
    }
    
    .experience .timeline {
        padding: 8em 0px;
    }

    /* The actual timeline (the vertical ruler) */
    .timeline::after {
        content: '';
        position: absolute;
        width: 6px;
        background-color: #474e5d;
        top: 0;
        bottom: 0;
        left: 50%;
        margin-left: -3px;
    }

    /* Container around content */
    .TLcontainer {
        padding: 10px 40px;
        position: relative;
        background-color: inherit;
        width: 50%;
    }

    /* The circles on the timeline */
    .TLcontainer::after {
        content: '';
        position: absolute;
        width: 25px;
        height: 25px;
        right: -17px;
        background-color: #474e5d;
        border: 4px solid #363b46;
        top: 15px;
        border-radius: 50%;
        z-index: 1;
        box-sizing: content-box;
        box-shadow: 1px 1px 10px 0 #000;
    }

    /* Place the container to the left */
    .left {
        left: 0;
    }

    /* Place the container to the right */
    .right {
        left: 50%;
    }

    /* Add arrows to the left container (pointing right) */
    .left::before {
        content: " ";
        height: 0;
        position: absolute;
        top: 22px;
        width: 0;
        z-index: 1;
        right: 30px;
        border: medium solid;
        border-width: 10px 0px 10px 10px;
        border-color: transparent transparent transparent #2c2f31;
    }

    /* Add arrows to the right container (pointing left) */
    .right::before {
        content: " ";
        height: 0;
        position: absolute;
        top: 22px;
        width: 0;
        z-index: 1;
        left: 30px;
        border: medium solid;
        border-width: 10px 10px 10px 0;
        border-color: transparent #2c2f31 transparent transparent;
    }

    /* Fix the circle for containers on the right side */
    .right::after {
        left: -16px;
    }

    /* The actual content */
    .content {
        padding: 20px 30px;
        background-color: #24252A;
        position: relative;
        border-radius: 6px;
        box-shadow: 1px 1px 10px 0 #000;
        z-index: 2;
    }

    .date {
        justify-content: center;
        background-color: rgb(32, 32, 32);
        padding: 6px 10px;
        margin: 10px auto;
        box-shadow: 1px 1px 5px #000;
    }

    /* Media queries - Responsive timeline on screens less than 600px wide */
    @media screen and (max-width: 800px) {
        /* Place the timelime to the left */
        .timeline::after {
            left: 31px;
        }

        /* Full-width containers */
        .TLcontainer {
            width: 100%;
            padding-left: 70px;
            padding-right: 25px;
        }

        /* Make sure that all arrows are pointing leftwards */
        .TLcontainer::before {
            left: 60px;
            border: medium solid white;
            border-width: 10px 10px 10px 0;
            border-color: transparent white transparent transparent;
        }

        /* Make sure all circles are at the same spot */
        .left::after, .right::after {
            left: 15px;
        }

        /* Make all right containers behave like the left ones */
        .right {
            left: 0%;
        }
    }
</style>