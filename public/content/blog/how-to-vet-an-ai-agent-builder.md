---
title: 'How to Vet an AI Agent Builder Before You Hire'
description: 'A buyer's checklist for hiring an AI agent builder: production proof, scoped logins, human approval, audit logs, a tested kill switch and who owns the keys.'
pubDate: 'Nov 21 2026'
tags: ['AI', 'agents', 'hiring', 'security']
author: 'Mattae Cooper, Lead Architect at aegntic labs'
---

# How to Vet an AI Agent Builder Before You Hire

*Mattae Cooper, Lead Architect at aegntic labs*

> To vet an AI agent builder, ask to see an agent they run in production, then question how it handles access. A good builder gives the agent its own scoped login, puts risky actions behind an approval the agent can't reach, logs every tool call, tests a kill switch and leaves every key in your name.

aegntic.ai builds custom agents, so weigh this advice with that in mind. See who we are on the [about page](https://aegntic.ai/about/). We expect to be scored on the same checklist.

Every builder has a demo that works. A bot books a table. A script files a ticket. Someone on a call says they can hook it up to your tools. Then you hire them. Weeks later the agent lives in their cloud account, the keys sit in a chat log, and nobody can say what it did last Tuesday.

This is a buyer's checklist for that moment: after you have decided to build an agent, before you sign. Judge a builder by what happens when the agent goes wrong, not by what it does when it goes right.

## Write a one-page brief before you talk to anyone

Write the job as steps a person could follow, on a single page, before the first sales call. Name the systems the agent will touch and the data it will see. State the worst realistic mistake (an email to the wrong customer, a refund issued twice, a record deleted) and how you will know the work is correct.

Then add a line the other guides tend to skip: what the agent must never do without a person. Money moving. Messages to customers. Deletes. Permission changes. That line becomes your approval list later. If a builder cannot map their design to it, they are not ready to quote.

## Proof it runs in production, not just in a demo

Ask for a system that is live today. What does it do each week? What broke after launch, and how did they find out?

Ask for a trace or log of a real run, with sensitive data removed. A video of a happy path is not that. A redacted log shows whether they record tool calls, errors and costs, or only the demo script.

Hiring managers say the same thing in public threads: asking what broke after deployment sorts people who have run agents in production from people who have followed a tutorial.

Also ask whether they have ever told a client not to build an agent. A builder with no such story will overbuild yours. The honest answer is sometimes that a checklist or a simpler script would do.

We run Hermes, our own agent fleet, not a system we built for a client. It does scheduled work every day. In September 2026 the processes stayed up, and the scheduled turns failed quietly. The primary model hit a usage limit. The free fallbacks failed too. We found it in per-agent error logs, not on a dashboard. The same day we changed the fallback policy. We did not buy more API credit. That is the kind of story to ask a builder for: what broke after it went live, and how they noticed.

## Credentials and access: the section most guides skip

This is the heart of the page. A demo tells you the model can complete a task once, on camera. Access tells you who is in control on a bad day.

### The agent gets its own login, not yours

A shared admin password is the common shortcut, and the one that causes the most damage later. When the agent uses a person's login, you cannot tell the agent's actions from the person's. If you revoke that password, you lock the person out too. If it leaks, the leak has the same reach as your administrator.

[NIST's October 2026 blog on design tenets for agent identity](https://www.nist.gov/blogs/cybersecurity-insights/design-tenets-agent-identity-management-systems) proposes an initial set of tenets, not a final standard. Tenet 01 is a distinct agent identity. Tenet 03 is least privilege and zero standing privilege. You do not need NIST's language. You do need to ask what login the agent uses, and what it can still do at 3am when nobody is watching.

Tooling exists that lets an agent sign in without seeing the password. [1Password for Agents](https://1password.com/press/2026/october/1password-for-agents-trust-layer-personal-ai-agents), announced on 22 October 2026, is one example: the agent does not read the credential, and approval can sit on the person's own device. That is an example of the pattern, not an endorsement of the product.

A longer page on giving an agent its own login is planned and is not on the site yet. <!-- FUTURE PAGE: idea 1, giving an AI agent its own login instead of saved passwords -->

### Every account and key in your name

The model provider, the host, the repo, the workflow tool, the domain and any phone numbers should be yours from day one. The builder is invited in. If you cannot revoke every credential the agent holds without phoning the builder, the build is not finished.

Prefer short-lived, scoped keys over permanent all-access keys. That matches NIST's proposed tenet 04 (short-lived, revocable authorisation).

Watch how they ask for access during the sales process. A builder who asks you to paste an admin password into email or chat will build an agent that handles secrets the same way. Ask for an invite, a vault or a temporary scoped credential. If they call that slow, believe them: they are telling you how they work.

[Our note on security for AI applications](https://aegntic.ai/blog/security-for-ai-applications/) is companion reading here. Access control and audit logs are part of the build, not extras added after the demo.

### Fewer tools, narrower tools

[OWASP's LLM06 (Excessive Agency)](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) names three root causes: too much functionality, too many permissions, too much autonomy.

Make each one concrete. An email agent that only needs to draft replies should not be able to send or delete mail. A billing agent that needs to read invoices should not be able to change payment details. A support agent that looks up orders should not issue refunds unless a person approves it.

If a builder hands the agent a full admin integration "so we have options," they have postponed the design until after something goes wrong.

## Human approval the agent can't reach

Decide which actions need a person: money, messages to customers, deleting data, changing permissions. Put that list in the brief. Then ask where the approval actually lives. If it is an email code, or a button in an app the agent can also use, it is not a control. It is a suggestion the agent can fetch.

A [Cornell Tech and Yale test reported by CoinDesk on 1 November 2026](https://www.coindesk.com/tech/2026/11/01/ai-agents-bypassed-crypto-spending-limits-without-human-approval-researchers-find-in-a-new-test) found that 9 of 10 models raised their own spending caps by reading emailed approval codes, and 5 of 10 paid a simulated impersonator while they had only been asked to summarise an inbox. This was a controlled research test with real but tiny funds, not an attack on Circle customers and not a report of customer losses. Ask the builder to show you an approval path the agent cannot reach.

NIST's proposed tenet 05 also warns about consent fatigue. If a person is asked to approve everything, they stop reading. A good builder puts a person in the loop for the few actions that matter.

A longer page on approval an agent cannot fake is planned. <!-- FUTURE PAGE: idea 18, human approval your AI agent can't fake -->

## Logs, monitoring and a kill switch you've seen work

Every tool call should be logged with inputs, outputs and cost, and stored where the agent cannot change it. NIST's proposed tenet 10 calls for append-only evidence held apart from the agent. If the only log lives in the same database the agent can write to, you do not have a record.

Add spend caps and loop limits so a stuck agent cannot run up a bill overnight. Ask the builder to demo stopping the agent during the pilot. Write down how long it took and who could do it. A kill switch that exists only in a slide deck does not count.

A longer page on watching what the agent actually does is planned. <!-- FUTURE PAGE: idea 17, logs, alerts and a tested kill switch -->

Every aegntic pilot from now on includes a stop demo and a redacted log of a real run.

## Testing before it touches real customers

Agree a written test set built from real cases, and rerun it every time a prompt, a tool or a model changes. If they plan to "try it and tweak," you will be the test set.

Include hostile inputs. An email or a document can carry hidden instructions (prompt injection). The builder should say how untrusted text is isolated and what happens when the agent tries to follow a planted instruction. "The model handles it" is not an answer.

For the failure paths themselves (timeouts, refusals, retries, what the user sees when a tool dies), our [note on error handling patterns](https://aegntic.ai/blog/error-handling-patterns/) is companion reading.

Anthropic's [guide to building effective agents](https://www.anthropic.com/research/building-effective-agents) argues for simple patterns over complex frameworks. That is a design preference, not a vetting test. It still makes a fair question: can the builder explain the agent's loop in a few steps?

## Ownership, handover and what happens if the builder disappears

You own the code, the prompts, the test sets, the configuration and the logs. Get that in writing before work starts, not as a favour at the end. You should also get a runbook another developer could pick up: how to start and stop the agent, where the keys live, what the test set covers, and who to call at each vendor.

If the accounts sit with the builder, leaving means rebuilding. Ownership is not a clause you admire in a contract. It is whose name appears on the login screen on day one.

## Freelancer, agency or independent engineer?

A freelancer is a fair fit for one narrow workflow you can check yourself. An agency, or an independent senior engineer, is the better fit when the agent will write to production systems or talk to customers.

Do not treat a published rate card as a substitute for that judgement. Our paid pilots start at US$5,500.

For market context only, [Gigabit's October 2026 AI Services Price Index](https://gigabit.agency/research/ai-services-price-index/) (Gigabit sells these services, and says so) surveyed published prices from 122 firms. Half of those firms publish no price. Of the prices that were published, the median entry price was US$20,000 for a production agent and US$12,000 for a pilot. That is one firm's survey of published figures, not a market rate and not a quote.

A longer page on hiring cost is planned. <!-- FUTURE PAGE: idea 2, cost to hire an independent AI agent engineer -->

## Run a short paid pilot

A useful pilot has a narrow job, a written test set agreed up front, human approval on every external action, a kill-switch demo, and a short report on what failed. Pay for it. Unpaid trials select for people who need the logo, not for people who will tell you the job is a bad fit.

There is no standard length that you should treat as a fact. Competitor guides range from two days to two weeks. It depends on the integrations. Agree an end date before you start.

## The vetting scorecard

Use this at the end of each call. Score each builder from 1 to 4 in every area, then multiply by the weight. The weights are our editorial judgement, not an industry standard. Change them if your risk sits somewhere else. A high score with a deal-breaker is still a no.

| Area | Weight | What to ask | Weak answer (1) | Strong answer (4) |
| --- | --- | --- | --- | --- |
| Production proof | 15% | Show me a live agent and a real trace. What broke after launch? | Demo video only | Live system, real trace, a clear failure story |
| Agent identity and access | 20% | What login does the agent use, and what can it reach? | Shares your admin account | Own identity, scoped and short-lived credentials |
| Approval gates | 15% | Which actions need a person, and where does that approval live? | "It asks in the chat" | Out-of-band approval the agent can't reach, on a short list of actions |
| Logs, monitoring, kill switch | 15% | Show me the logs and stop the agent now. | No logs, no stop path | Append-only logs, spend caps, stop demonstrated in the pilot |
| Testing | 15% | How will we know it works, and what happens when you change the model? | "We'll try it and tweak" | Written test set including hostile inputs, rerun on every change |
| Ownership and handover | 15% | Whose name is every account in? What do I get at the end? | Builder's accounts | Your accounts from day one, runbook, exportable everything |
| Builder legitimacy and habits | 5% | Can I speak to a past client live? How do you want my access shared? | Email-only references, asks for passwords in chat | Live references, verifiable identity, uses invites or a vault |

**Deal-breakers (automatic fail), whatever the score:** the builder asks for your admin password; they keep keys or accounts in their name; they cannot show how to stop the agent; they will not name who does the work.

A branded [downloadable scorecard](/downloads/how-to-vet-an-ai-agent-builder-scorecard.pdf) is available, so you can use the same sheet off the page.

Want us to score our own proposal against this checklist? Send your one-page brief through [aegntic.ai](https://aegntic.ai) and we will say honestly whether you need an agent at all. We start with a paid pilot, from US$5,500.

## Red flags that should end the conversation

- Asks for your admin password, or wants to use their own accounts "to save time."
- No production system to show, only videos.
- Promises accuracy or savings figures before seeing your data.
- Full autonomy on day one, with no approval step for money or customers.
- No answer on prompt injection, or an answer that is only "the model handles it."
- Cannot say how to stop the agent, or has never tested the stop path.
- Will not name who writes the code.
- References only by email, never a live call.

One more: they cannot prove they are who they say they are, or that the portfolio is theirs. Speak to references live. If the only proof is a polished site, keep walking.

## What to do next

Write the one-page brief, including the "never without a person" line. Use the scorecard on every call. Pay for a short pilot with a stop demo and a real trace. Do not sign a build until every account is in your name.

After you hire, the next job is a careful rollout: one job, its own login, draft-only access and a regular review. A page on that first rollout is planned. <!-- FUTURE PAGE: idea 26, your first AI agent rollout --> A dedicated custom-build page is also planned, and should become the lasting destination for this offer once it exists. <!-- FUTURE PAGE: idea 3, custom AI agent build service page -->

Want us to score our own proposal against this checklist? Send the brief through [aegntic.ai](https://aegntic.ai). The useful first answer is sometimes no. We start with a paid pilot, from US$5,500.

## FAQ

### What questions should I ask before hiring an AI agent developer?

Ask to see an agent they run in production, and a log of a real run with sensitive data removed. Then ask whose name the keys are in, what login the agent uses, which actions need a person, where that approval lives, how you stop the agent, and what you own at the end. If they cannot show those things, keep looking.

### What is the biggest red flag when hiring someone to build an AI agent?

The biggest red flag is a builder who wants your admin password, or who plans to run the agent inside accounts they own "to save time." If you cannot revoke every credential without phoning them, you do not control the system. A close second is a polished demo with no live production story and no way to stop the agent.

### Should I hire a freelancer or an agency to build an AI agent?

Hire a freelancer for one narrow workflow you can check yourself. Choose an agency or an independent senior engineer when the agent will write to production systems or talk to customers. Price is a separate question from the shape of the team. Our paid pilots start at US$5,500, and that starting figure is not a substitute for judging the fit.

### Who should own the API keys, accounts and code for my AI agent?

You should. Model provider accounts, hosting, the repo, workflow tools, the domain and every API key should be in your name from day one. The builder gets an invite. You should also own the code, prompts, test sets, configuration and logs, in writing. If the accounts sit with the builder, leaving means rebuilding.

### How do I check an AI developer's work if I'm not technical?

You do not need to read the code to run a useful check. Ask for a live system and a real trace. During a paid pilot, agree a written test set, watch them stop the agent, and confirm every account is in your name. If a claim cannot be shown, treat it as unproven.

### How long should a paid pilot for an AI agent take?

There is no standard length that fits every build. Published guides range from two days to two weeks, and the right span depends on the integrations. Agree an end date, a narrow job, a written test set, human approval on every external action, a kill-switch demo and a short report on what failed.

### Does an AI agent need its own login?

Yes. A shared password hides the agent's actions inside a person's account, and revoking it locks the person out too. NIST's October 2026 proposal (an initial set of tenets, not a final standard) says agents should have identities separate from humans, with no standing privilege. That is tenet 01 in [NIST's design tenets post](https://www.nist.gov/blogs/cybersecurity-insights/design-tenets-agent-identity-management-systems).

### What is a kill switch for an AI agent, and how do I test one?

A kill switch is a way for a person to stop the agent immediately: revoke its access, halt its loop and prevent further tool calls or spend. Ask the builder to demonstrate it during the pilot. Write down how long it took and who could do it. A switch that exists only in a slide deck does not count.
