# Decisions

One line per call made where the brief and the guide were silent, or where two rules met.

## Assets
- The brand kit folders were not attached, so logo, icon, character and field art were lifted unchanged from the vector pages of the published brand guide (pages 19, 21, 30, 41, 43). Swap in the 01_Logo, 04_Mascots and 05_Icons files before launch if they differ.
- Header uses the primary full color lockup; footer uses the reversed lockup (White and Corner Sky), both as SVG.
- Favicon is the icon lockup as SVG with 32 and 180 px PNG fallbacks.
- The hero art is the guide's match field scene (page 43, the one the mockup uses), cropped to the panel; nothing was redrawn.
- Match field dot opacity was clamped to 25 to 60 percent to meet the brief; the guide file runs some dots up to 85 percent.
- The mascots carry their own skin and trouser tints (#DCEAF9, #C2DAF5, #2E3B5E) inside the inline art; they are supplied as is and never appear in the CSS.
- The hero keeps the faint dashed field lines from the mockup art; they appear nowhere else.

## Layout
- Hero copy spans 7 columns and the Panel Blue art bleeds from column 8 to the right edge, per the brief rather than the 50/50 split in the mockup image.
- Tablet margin is 32 px, between the 64 px desktop and 16 px phone margins.
- Hero stacks under 960 px with the art panel below the buttons at 340 px tall, 300 px on phones.
- The problem body line sits in an 8 column span but is capped at 60 characters per the measure rule.
- The lanes run full bleed, 7 columns for students and 5 for labs, since the lab door is now a heading and one button; they stack under 960 px.
- Lane icon pairs: Free with The match, five-minute form with Student profile, introduced with Introduction. Fit confirmed was left out because it reads as a check mark.
- Buttons are 44 px tall (12 px padding, 2 px border) to stay on the spacing scale.

## Steps
- Step titles take the H3 type style but are not h3 elements, because a heading cannot live inside a tab button.
- The rail connector stays Fog between every step; completed steps show through their Reach Blue outline only.
- Inactive step lines sit at 72 percent opacity, which still clears 4.5 to 1 on Pale Sky.
- Back shows in Slate and does nothing on step 1. On step 3 Next disappears and Back is the only control.
- In step 3 the center shape also takes the Reach Blue outline so both ends of the match read as a pair.
- The chosen lab square grows to 1.4 times its field size in step 3 so the pair balances.
- On phones the rail shows three numbered circles and the active step's title and line sit below them.
- Without JavaScript the three steps stack, each with its scene.

## Revision 2
- Labs no longer get their own walkthrough: the view switch, the lab steps and the privacy line are gone from How it works, and the lab lane is a heading and one email button.
- No personal names appear on the site. The lab button reads Email us to join and the prefilled email opens with Hi.
- The lab address is still a personal IU inbox. A shared team address would remove the last trace of a name; change LAB_EMAIL and LAB_MAILTO in main.js and the two mailto links in index.html.
- About page copy comes from the guide's purpose, values and boilerplate. Proof before claims was left out because the page carries no numbers; training time uses the approved wording, up to two months.
- About uses the Student and Professor from the guide's waving pose, the one the guide sets for story openers. No founder names or photos until you supply them.
- About is linked from the header and footer on both pages; the current page is marked with a Reach Blue underline.
- Headings that start below the fold wait to enter; anything visible at load is never hidden.

## Revision 3
- I run a lab, the lab lane button, the header For labs link and the footer Lab sign up link all go to a short labs page.
- The labs page uses approved copy: the faculty line The right student for every lab, the three lab steps, and the privacy line, then one email button to set up a time with the address printed beside it.
- The prefilled email now asks for a few times that work to talk.
- The labs page shows the Professor holding the profile, the pose the guide sets for sign up pages.
- About drops Where we are and the By hand, then at scale value.

## Revision 4
- The hero art is recomposed for a tall panel: the Student and the Professor stand larger on a shared floor, the match field sits above them, and the art always fills the panel, so no empty bands appear on any screen.
- Between 960 and 1199 px the hero splits 6 and 6 so both characters stay whole; under 960 px the panel sits below the buttons at 3 to 2, and square on phones.
- The navigation folds into Menu below 960 px now that it has four links.
- For students is one Panel Blue band: heading, button and form address on the left, the three rows on the right.
- For labs is a slim white band under it with a Corner Sky rule: heading on the left, one line and an outlined Set up a time button on the right.
- The labs page opens like the home page: copy on the left, a full height Panel Blue panel on the right with the Professor holding a profile inside a field of lab squares and student circles.

## Revision 5, motion
- Motion now runs on anime.js 4.4.1, served from the site's own assets folder so no outside host is needed.
- This revision overrides the original motion rules at your request: the hero, problem panels and steps now move continuously while on screen.
- Hero opens in sequence: headline words rise, the field blooms outward from the match, the characters spring up, the match line draws, both ends glow. After that the field drifts, the characters breathe, the dashed links flow and a spark carries the introduction back and forth along the line. On a laptop the field leans toward the pointer.
- The cold email panel streams envelopes from the student into the labs, where they stall and fade; nothing returns. The fix panel draws its line once, then runs the same two-way spark.
- Step 3 of How it works runs the spark once the line lands, and step 2's field arrives in a stagger.
- Section headings rise word by word; list rows, values and lab steps slide in; lab step numbers spring in; the About characters spring up and breathe; buttons lean toward the pointer.
- The headline reveal is plain CSS so the page paints at once; loops pause when their section leaves the screen.
- With reduced motion on, or if the script fails, nothing moves and every element shows at rest.

## Revision 6
- Email us to set up a time now opens a ready draft to the lab inbox in Outlook on the web, in a new tab. IU faculty are already signed in there, so it works even without a desktop mail app, which is why the old email link did nothing for some people.
- A small line under the button offers the same draft in Gmail or the computer's own mail app.
- The printed email address is gone from the labs page.

## Revision 7, team
- About gains a Who we are section after Why we started: a short line on the team, then Misha Patel and Atharv Neema side by side with their newest headshots.
- Headshots are cropped to matching 4 to 5 portraits at 640 by 800 and compressed to about 35 to 60 KB each; both keep their dark studio backgrounds.
- Each profile lists Co-founder, what they study and what they lead, taken from the team slide. Atharv's adds a background line; Misha's has none until she supplies one.
- The team line uses the team slide's facts: faculty interviews in Biology, Chemistry and Psychology, and support from IU Innovates.
- No emails on the profiles, matching the rest of the site.
- The photos open upward like a shutter as the section arrives, and the facts follow.

## Revision 8, no surprise jumps
- Set up a time at the top of the labs page now opens the email draft directly instead of jumping down to the contact section.
- Student profile in the footer opens the student form directly instead of jumping to the student band.
- Every page opens at the top: the browser no longer restores an old scroll position on reload, and section links never leave a #name in the address bar, so a copied or refreshed link starts at the top.
- Header links that name a section (How it works, For students) still glide to that section, since that is what they say.

## Revision 9
- The fix caption is now a full sentence: With Research Reach, every student gets one introduction to a lab that fits. It keeps no closing period, like every other heading on the site.

## Revision 10, leaving Netlify
- The site no longer depends on any one host. Every link and file path is relative, so it runs the same at a domain root or inside a GitHub Pages repository folder.
- The 404 page works out its own root before loading, so its styles, icon and Back button work at any depth and on any host.
- A .nojekyll file is included so GitHub Pages serves every file as is.
- The share image link is relative until the final address is set; once it is, it becomes the full address so link previews show the image.

## Copy and routing
- The problem section carries a visually hidden h2 so the heading order stays correct; no visible copy was added.
- The printed form address drops the https prefix, as the brief's copy does; everything after it matches the link character for character.
- Footer Student profile jumps to the student lane; Lab sign up opens the labs page.
- The sign up config block sits at the top of main.js and is applied on load; the same links are written into the HTML so the page works without JavaScript.

## Motion
- Step 3 waits 250 ms for shapes to settle, draws the match line in 700 ms, then pulses both ends.

## Delivery
- main.js keeps the config block readable at the top; the rest is compacted to stay under 6 KB. The readable source is in source/main.readable.js.
- Google Fonts loads without blocking render; Georgia is listed first, so Gelasio only downloads on devices without Georgia.

## Version 3, scroll driven rebuild (11/04/2026)
- Switches run on their defaults, all still open with Atharv: italic accent on, numbers off, white ground, floating header, ribbon hero.
- Motion moved from anime.js to GSAP 3.15.0 with ScrollTrigger, self hosted; anime.js, motion.js and the prototype files are removed from the repository.
- Display type drops to Georgia 400 at 72/76 (44/48 on phones) with one italic accent per headline, the lighter weight the reference uses.
- The two full bleed color blocks (the problem block and the closing panel) take a 32 px radius, new in this version.
- Hero copy is centered over the ribbon, to echo the reference; the ribbon is an SVG textPath with its curve computed from the real screen width so the text stays 15 px everywhere.
- At Atharv's request every scene uses the Student and the Professor from the brand pose sheet in place of student circles and lab squares; professors in a field show as small portrait tiles, and students on the labs page do the same.
- Poses used: reaching pair for every match, the Student holding a profile for step 1, the Student pointing to fire cold emails, the Professor holding a profile on labs, both waving on About, the Student shrugging on the 404.
- Characters on Panel Blue scenes carry a thin white outline so the Professor's navy suit reads against the Ink Navy block.
- The problem block pins for 150 percent of the screen on laptops; on phones and tablets the same scene plays once as it enters, captions crossfading in place.
- How it works pins for 300 percent of the screen on laptops with a fine pointer; everywhere else Back, Next, swipe and the rail step through the same timeline.
- The closing panel scrubs the Student and the Professor in from the edges on laptops and plays once on phones; the match line draws at the end.
- Labs steps draw a Corner Sky connector between numbered circles as the section arrives; it turns vertical on phones.
- Why we started fades each paragraph from 18 to 100 percent as it scrolls into the reading line.
- The 404 uses an h1 set in the H2 style so the page keeps a top level heading.
- Under reduced motion nothing pins or loops and every scene shows its finished state; both problem captions stack. Without JavaScript the How it works steps stack under the finished stage.
- A skip to content link appears on keyboard focus.

## Version 3, revision 1 (11/04/2026)
- The cold email ribbon and floating card are replaced by Two profiles, one introduction, chosen by Atharv from six mocked directions: the Student and the Professor each hold a profile, both profiles travel along dotted trails into the Research Reach pill, and one introduction card drops out with both portraits joined by the match line. It loops while on screen and runs faster while scrolling.
- On phones the scene restacks: the introduction card on top, the pill between the two characters below it, so nothing crowds at 390 px.
- Under reduced motion and without JavaScript the scene shows the finished introduction.
- The fix caption now reads With Research Reach, students get introduced to a lab that fits.
- Who we are keeps name, Co-founder and Studies only; the team line and the Leads and Background rows are gone.
- What we hold to drops Same door for everyone.
- For labs on the home page mirrors For students: heading, Set up a time button (opens the ready Outlook email) and the line Free for labs. Your lab details stay private. on the left, three numbered rows on the right on a Pale Sky band.
- Lab steps, approved by Atharv: Get on a 15-minute call with us, Or fill out a five-minute lab profile / We screen every student, Nothing for you to sort through / Meet only the students who fit, You decide who joins. Step 1 on the labs page matches.
- The button stays on email until a lab profile form link exists.
- List rows now slide in from the left so nothing sits past the right edge on phones before it enters.

## Version 4, mentor revisions (live 11/08/2026)
- The home page speaks to faculty and department leaders first; students get a top strip, one band and their own page, students.html.
- labs.html now redirects to the home page so links already sent to faculty keep working.
- The only two button labels are Find me a student and Find me a lab; Find me a student opens the ready Outlook email until a lab form link exists.
- Headlines use Georgia Bold per the brand guide, and nothing on the site is italic.
- The hero keeps Matching students with research opportunities, with the Student and the Professor reaching toward the Research Reach mark labeled The match, and a student application and a lab application feeding into it.
- The rope between the characters is replaced by the Research Reach mark everywhere: hero, How it works step 3 and the closing panel.
- What recruiting costs each lab today compares Today (750+ cold emails a semester in one department, 20+ interviews, 1.5 to 2 months lost onboarding each new student) with Research Reach (80+ hours given back each semester per lab).
- 80+ hours: 4 to 8 weeks of mentoring at about 8 hours a week (32 to 64), 20 interviews at 30 minutes (10), 750 emails at 2 minutes (25); 67 to 99 hours, midpoint 83. The math is not shown on the site.
- Every source line was removed at Atharv's request, including the student NSSE line.
- Why labs join was removed with its nav link.
- How it works plays steps 1, 2 and 3 on its own and loops, with a Pause button and clickable steps; under reduced motion or without JavaScript all three steps show as still frames.
- Faculty answers: a 15-minute call or a five-minute form; as many students as you ask for, only real fits; student information handled with FERPA and other privacy protections in mind and kept in a secure database; every department can join.
- Student questions are full sentences with warmer answers; research experience is not necessary.
- The student entry point stays in the top strip for now; the recommended move is a small Student? Find a lab link inside the header.

## Version 4, story and click path (live 11/08/2026)
- Navigation is by reader: For departments, For faculty, For students, About, then Find me a student. Questions sits on the page, not in the nav.
- The hero gains a second door, Leading a department? See what it saves, and a proof line: 4 labs at IU Bloomington this fall 2026, 100+ students signed up.
- New section, What it saves a department, on Ink Navy: 3,000 hours a semester across a department of 50 labs (about 60 hours per lab times 50), two rollout steps, the data agreement line and a Bring Research Reach to your department link that opens a ready email with its own subject.
- Per lab figure is now about 60 hours, so it squares with 750+ being a department count: 48 hours of mentoring, 10 hours of interviews and about 1 hour on 30 cold emails.
- How it works step 3 now shows the introduction email landing in the Professor's hand, so it no longer repeats the hero.
- The sample introduction loses its extra Find me a student link.
- Faculty answer on student information adds that every lab signs a mutual data sharing and confidentiality agreement.
- The closing promises a reply within one business day.
- The footer names Research Reach LLC and both founders with a Meet the team link.
- The students page adds 100+ IU students signed up and a Today versus With Research Reach comparison.

## Pages by reader and the full process page (live 11/09/2026)

1. Each reader has a page. The home page is for faculty, departments.html is for chairs and leadership, students.html is for students, and how.html walks one match from start to finish for anyone
2. The main button appears three times on the home page: header, hero and close. Every other spot is a text link
3. Every button says what the click does in the line under it (a ready email, or a five-minute form)
4. The hero line under the headline names the cost first: about 60 hours a semester per lab
5. A comparison strip sets a listings portal against Research Reach without naming any company
6. Department email goes to the shared company inbox. Lab email is unchanged
7. A faculty quote slot is built and stays hidden until a professor approves real words. Set QUOTE in build_site.py
8. The tab title matches the headline. The old preview folder is removed from the repo

## Home page as a simple router (live 11/09/2026, second pass)

1. The home page now holds the headline, the match picture, three doors (lab, department, student) and the proof line. Nothing else
2. Everything written for faculty moved to faculty.html. labs.html redirects there
3. The student strip, the department teaser and the student band are gone from the home page. The navigation and the three doors carry those readers
4. All email, including department email, goes to Misha's inbox for now
5. The How it works page lists nine things checked for every student under step 3

## 11/09 evening polish pass

Header. The links moved between pages because the right-hand button changes label and width per page. The bar is now a three-column grid with the links on its true centre and a fixed 188px button. Scrollbar space is reserved on every page. The menu collapses below 1100px.
Spacing. One scale (8 16 24 32 48 64 96). Sections sit 96 apart on desktop and 64 on phones, set by one rule on main. Tinted bands carry the same value as padding.
Edges. Navy blocks now share the 1200 column with all other content.
Home. Three door cards replaced by an index of three full-width rows. Statement and numbers sit in one pale band.
Departments. Feature block for 60 hours beside two detail rows, a connected three-step timeline and a navy privacy block replace three equal card grids.
Footer. Two link columns. FAQ and Terms & Conditions live here only. The independence line is removed from the footer and stated once inside the Terms.
New pages. faq.html (tabs for faculty, departments and students, hash selects a tab) and terms.html (draft terms, needs legal review. Indiana governing law and a 100 dollar liability cap are placeholders to confirm).
Copy. Every "Opens a ready email" and "Opens a form" hint line removed.
Motion. Header shadow on scroll, count-up numbers, row hover fills, button press, section reveals. All off under reduced motion.

## Version 5, one story (live 11/11/2026)

Direction A Cost first. Every page leads with what the reader loses today and then names what we take back. The core fit promise, the 15 minute lab form, the 60 hour per lab figure, no portal and no login, and the versus listings table each live in one canonical home. Everything else moves to a text link.

Removed
- Faculty "How it works for your lab" section. The story is on how.html.
- Faculty "Other tools stop at the listing" table. Replaced by one text link to how.html#versus.
- Faculty FAQ items "How much time does this take?" and "How many students will you send?". The sample card and the hero micro answer them.
- Departments "What your department gets" grid (60 hours feature + two cards). The hero now names 60 hours per lab in one math line under 3,000 hours.
- Departments "Nothing reaches a professor until it fits" pull quote.
- Departments versus table, replaced by one text link.
- Departments FAQ items "What does the department need to do?" and "How do you handle student information?". How a department starts and Private by design answer them.
- Students "Finding a lab, two ways" section.
- Students odds row three (100+ IU students). The home ledger and the faculty hero carry the proof line in one wording.
- Students "What happens after you submit" step one. The hero already names it.
- Students FAQ items "Does it cost anything?" and "Who will see my profile?". The hero micro answers both.
- How page three door cards (clone of the home router). Replaced by a Keep reading row with three text links.
- How page 60 hours vs 15 minutes timebars. Replaced by one three row time ribbon in the hero.
- Footer "Meet the team" link (the About link reaches the same page).

Renamed and merged
- "See the whole process step by step" merged to "See how it works" everywhere.
- "Bring Research Reach to your department" (departments closing) merged to "Ready to talk?" with button "Talk to our team".
- "Email our team" merged to "Talk to our team" (faq.html and terms.html).
- Reply wording standardized to "within one business day".
- "Which departments can join" answer standardized to "Every lab in every field. Research Reach is built to work across all departments."

Kept and the test that kept it
- The proof line (4 labs at IU Bloomington this fall 2026, 100+ students signed up) on the home ledger, the faculty hero and the departments hero, exact wording, under R3 Cold landing and R5 Exact consistency.
- The fit promise named once per page: in the home hero lead, in every landing hero in its own voice, in how.html step 3 (canonical), in the About "What we hold to" belief. R3.
- "Free for faculty" on the faculty hero. R3.
- Three Q and A on faculty page, two on departments, three on students, each chosen for a question the page itself does not answer above. R3.
- The one standing privacy clause in Terms section 6 (legal need).

Word counts (visible body, header and footer stripped)
index 111 kept. faculty 514 to 286. departments 445 to 249. students 349 to 242. how 373 to 329. about 223 to 223. faq 686 kept and tightened. terms 794 kept. Total body 3502 to 2906.

Defaults logged where the brief left room
- FAQ page is the only full home for Q and A. Each landing page lists only questions not already answered above.
- The versus listings table runs only on how.html. Faculty and departments carry a one line text link.
- "About 60 hours" lives only on faculty.html. Departments names 60 hours only as the math under 3,000 hours.

## Brand type change (11/11/2026)
- Headings now set in Gambarino, body in Supreme. Both are Fontshare fonts under the ITF Free Font License, self hosted in assets/fonts with the license file alongside.
- Supreme loads as one variable file (weights 100 to 800), so the existing 400, 500 and 600 text weights all hold.
- Gambarino ships a single Regular weight. Every display declaration that asked for 700 now asks for 400, so the CSS matches what renders. font-synthesis stays off, so no browser fakes a bold.
- Georgia and Arial stay as fallbacks. Gelasio and IBM Plex Sans no longer load. IBM Plex Mono stays on Google Fonts for the numbers, dates and counters.
- Headings carry extra weight through a text stroke sized at 0.03em, set once in --display-stroke, so they read bold even though Gambarino has no Bold file. It applies only to the type that was bold before (headings, stat numbers, FAQ tabs, index titles), so quotes and display body lines stay regular.
- The top menu links (For faculty, For departments, For students, How it works, About) now use the heading face at 18px with the same stroke, 20px in the phone menu. Link spacing drops to 16px between 1100px and 1199px wide so About clears the button. The Find me a student button and the footer stay in Supreme.
- Both woff2 files are preloaded on every page and the stylesheet version moved to 1111i to clear cached CSS.

## Version 6, reference not pitch (11/11/2026)
Type
- Boska sets display and Nippo sets text, chosen by Atharv at Gate 1. This replaces the Gambarino and Supreme change above and the type section of brand guide v1. The Gambarino and Supreme files are deleted.
- Both fonts are self hosted in assets/fonts with font-display swap. boska-700 and nippo-400 are preloaded. Tuned fallback faces (Times New Roman and Arial with size-adjust) keep text from jumping while fonts load.
- No Georgia, Gelasio, IBM Plex or Sometype anywhere on the site. Nippo has no tabular figures, so counters and dates use Boska with tabular lining numerals.

Header
- No Menu button at any width. The 5 links always show and drop to a second row of the bar when the row would collide. Text never goes under 14px.
- The header button sits 12px from the bar's top, right and bottom, and 12px from the links when they share its row.
- Below 1100px the header scrolls with the page instead of staying pinned. At 374px and under the logo shows as the mark only.

Pages
- Section headings are short labels. H1s and closings are actions. The VERSUS table is titled "Why we are better", names no competitor, and runs on faculty, departments and how.html.
- Faculty: inline How it works in 3 steps, each naming who, what and how long.
- Departments: 3 benefits replace "How a department starts". Fair access for students follows, then the comparison and Private by design. The quote slider is built and held out until 2 approved quotes are supplied (QUOTES in build_site.py).
- Students: the odds band is gone. "What you submit" lists the fields from the live student form (11/11 copy). The privacy line matches the form: only our team sees a profile, and a lab sees it only with the student's approval.
- how.html: a 3 lane timeline, student left, lab right, our team down the middle, one column on phones. The line draws with the scroll and steps come in as it reaches them, transform and opacity only, no pinning. Reduced motion and no JavaScript show it complete. The repeated 15, 5 and 1 tally block is removed.
- The nine factors now match the form: major and minor, class standing, courses taken, GPA if shared, hours a week, days and terms free, paid or credit, lab experience, research interests.
- About: "What we hold to" becomes "Our mission".
- Questions render closed by default. Opening them by script after load caused a 0.12 layout shift on faq.html.
- Check-ins at match and one month later stay off the site, per Atharv.
- Every student button still points to the current form link, per Atharv, even while that form is closed.

SEO
- Unique titles under 60 characters and descriptions of 140 to 160. Canonical links point to researchreached.com. sitemap.xml and robots.txt ship at the root. Organization data on the home page and FAQPage data on faq.html.

Analytics and booking (both off until set)
- CLARITY_ID and CAL_LINK sit at the top of build_site.py and are written into main.js at build. Empty means no tag, no band and no request to either service.
- With CLARITY_ID set: the tag loads, each page sets its audience, every data-cta click and every booking open sends an event, and the Clarity sentence is added to Terms section 6, per Atharv. Dashboard: masking Strict, exclude Atharv's IP, add both domains.
- With CAL_LINK set: a booking band sits above every footer, the About page gets a calendar that loads near the screen, and chairs see "Book a call" in place of "Talk to our team", per Atharv. The popup traps focus, closes on Escape and returns focus. Without JavaScript each button is a plain link.

Still open
- 2 approved quotes for the departments slider.
- Approval of the Fair access and mission wording.
- From the fresh eyes review: a company address behind the buttons, a real faculty form, a source or estimate label on the 3,000 and 60 hour figures, student wait time and what happens when no lab fits.
