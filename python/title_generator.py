import pandas as pd
import anthropic
import time
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
import json
import os
from pathlib import Path

# Path configuration - everything is in the Scripts folder
SCRIPT_DIR = Path(__file__).parent

# Your API key
API_KEY = "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"

# Google Sheets configuration
SHEET_ID = "1vZZvgZZk62w4ivAQjKSsh-SaUGGcvgj1jvk7ulombs4"
SHEET_NAME = "WP Editing Tracker"

# Initialize Claude client
client = anthropic.Anthropic(api_key=API_KEY)

# Your refined prompt template
PROMPT_TEMPLATE = """You will generate 20 compelling title options foor a given article topic. These are travel articles published by "When In Your State." These articles target older Americans on MSN and cover historical and heritage travel, travel news, travel guides, and place-based topics focusing inside the USA.

Critical Rules
STAY ON TOPIC: Titles must accurately reflect the article content. Research can enhance details but never introduce different angles or topics.
RESEARCH WHEN NEEDED: If article mentions something is visitable but unclear how, research it. If article says "deep" without measurement, find the measurement. Use research to add specificity and drama while staying completely on topic.
NO CLICKBAIT: Never use "you won't believe," "this will shock you," numbered lists (unless article is actually a list), or manipulative language.
USE SIMPLE WORDS: Our readers are curious and like to learn new things, but they dont have a wide vocabulary.

Core Principles
1. Hook First Most compelling element in the first 5 words. Readers decide to click immediately.
2. Emotion + Information Titles must make readers feel something (awe, curiosity, injustice, fear, mystery) while promising specific information.
3. Specificity Over Generic
Bad: "A nuclear bunker"
Good: "A nuclear bunker that held $4 billion"
Better: "Virginia's Cold War cash vault"
4. Character Count: 65-90 Under 65 feels incomplete. Over 100 loses punch.
5. So What Factor Every title answers: Why should someone from another state care? What's surprising, unjust, mysterious, or awe-inspiring?

Format Patterns
Direct Mystery Statement
States something unusual as fact. No question mark.
Structure: [Location] has/hides [unexpected thing]
Examples:
Somewhere in South Carolina is a missing nuclear bomb (58)
There's a US warship trapped in North Korea since the Cold War (67)
Virginia hid $4 billion in shrink-wrapped cash inside a mountain during the Cold War (87)
What makes it work: Verifiable strangeness stated as matter-of-fact truth.

Consequence/Reversal Structure
Action → surprising result. Uses dashes or "so" for cause-effect.
Structure: [Someone] did [action] – [unexpected consequence]
Examples:
His owner branded him like cattle – so he crippled Louisiana's cruelest plantation (87)
The day North Koreans poked the wrong US battleship and got erased by 16-inch naval guns (95)
With one signature, this chief erased the St. Croix Chippewa for over half a century (88)
What makes it work: Human agency and ironic outcomes create narrative tension.

"Here's What/Why" Explainer
Observable thing → explanation promised.
Structure: If you see [thing], here's what it means / [Observable fact] - here's why
Examples:
If you see a star on a West Virginia barn, here's what it means (69)
Navajo guides refused to enter this Colorado valley - and you can still see why today (86)
What makes it work: Promises to resolve mysteries readers might encounter. "Still" adds present-tense relevance.

Accusatory/Corrective
Calls out misinformation or erasure.
Structure: [Common belief] is wrong/a lie - here's the truth
Examples:
New Mexico's "Aztec" ruins are a lie - here's who actually built them (71)
The massacre site Texas tried to erase from history (56)
What makes it work: Readers like learning hidden truth. Creates informed vs misinformed dynamic.

Present-Tense Problem
Ongoing issue, not just history.
Structure: [Thing] is happening right now in [place]
Examples:
Migrating birds keep dying at this Montana lake (49)
Trillions of animals depend on this Idaho lake - but it's drying up (70)
Colorado has a cliffside town so toxic, it's illegal to go near it (67)
What makes it work: "Keep," "still," "is" make it immediate and unresolved.

How Question (Unexplained Presence)
Something doesn't belong where it is.
Structure: How did [unlikely thing] end up in [unlikely place]?
Examples:
How did a piece of the Berlin Wall end up in San Bernardino, CA? (70)
How California lost the Tongva people, an ancient tribe of Los Angeles Basin (77)
What makes it work: Geographic displacement creates instant curiosity.

Travel Hook Format
Combines impressive fact with accessibility.
Structure: [Location]'s [superlative] [thing] is [impressive detail]
Examples:
Virginia's Cold War cash vault is now a film archive you can visit (68)
New Mexico's rarest hike goes down an ancient pit that's 10-story deep (72)
What makes it work: Superlative + specific detail + implied or explicit visitability.

Research Protocol
When to Research
Article lacks specific measurements (how deep? how long? how many?)
Unclear if location is visitable/accessible
Need to verify dramatic claims (oldest, largest, only)
Want visual scale comparisons (building height, football fields)
Article hints at consequences without specifics
How to Research
Step 1: Identify what's missing from the article that would make the title more compelling
Step 2: Search using specific place names + key terms
Example: "[Location name] + [key feature] + tour/visit/accessible"
Example: "[Location name] + [key feature] + depth/height/size"
Step 3: Extract relevant specifics
Numbers, measurements, timeframes
Current status (still there? still accessible?)
Dramatic comparisons for scale
Step 4: Verify claims before using them in titles
Critical: Stay On Topic
✅ GOOD - Enhancing existing story:
Article: "Mount Pony held cash during Cold War, now an archive"
Research: Confirms $4 billion, visitable, now film archive
Title: "Virginia's Cold War cash vault is now a film archive you can visit"
❌ BAD - Introducing new angles:
Article: "Mount Pony held cash during Cold War, now an archive"
Research: Finds nearby Civil War battlefield
Title: "Virginia's Civil War battlefield near Cold War bunker" ← WRONG TOPIC

Writing Rules
Rule 1: Hook in First 5 Words
Bad: "There's a county fair in North Dakota that started as military camp" Good: "North Dakota's oldest fair started as a cavalry camp"
First version buries "oldest" and "cavalry." Second leads with both.

Rule 2: Concrete Details, Not Vague Descriptors
Vague: "This mine was really old and impressive" Concrete: "This mine took 700 years to dig and is 10-story deep"
Use numbers, names, specific materials (turquoise, cash, film reels).

Rule 3: Show Human Agency or Consequence
Passive: "A chief signed a document" Active: "With one signature, this chief erased the St. Croix Chippewa for over half a century"
Who did what? What happened as result?

Rule 4: Create Contrast or Irony
Flat: "This building used to be a bunker" Contrasting: "Virginia's Cold War cash vault is now a film archive you can visit"
War preparation vs cultural preservation. Bigger the contrast, more interesting.

Rule 5: Use Present Tense When Possible
Past-focused: "Ancestral Puebloans carved this pit 700 years ago" Present-tense: "New Mexico's rarest hike goes down an ancient pit that's 10-story deep"
Present tense makes history immediate and relevant.

Rule 6: Avoid Clickbait Phrases
Never use:
"You won't believe..."
"This will shock you..."
"Number 7 will blow your mind..."
"Everyone is talking about..."
Older MSN audience wants substance, not manipulation.

Rule 7: Character Count 65-90
Too short (52): "Colorado has a toxic town" Just right (67): "Colorado has a cliffside town so toxic, it's illegal to go near it" Too long (98): "Colorado has a cliffside town that's so toxic from mining pollution that it's illegal to go near it"

Common Mistakes
Mistake 1: Burying the Lead
Wrong: "In 1969, the Federal Reserve made a decision that would lead to..." Right: "Virginia hid $4 billion inside a mountain during the Cold War"

Mistake 2: Multiple Hooks
Wrong: "This 700-year-old mine supplied turquoise to Canada and Mexico and is 130 feet deep and you can hike it" Right: "New Mexico's rarest hike goes down an ancient pit that's 10-story deep"
Pick the single most compelling element.

Mistake 3: No Emotional Payoff
Flat: "The USS Pueblo was captured in 1968" Emotional: "There's a US warship trapped in North Korea since the Cold War"
"Trapped" creates helplessness and frozen-in-time feeling.

Mistake 4: Generic Geographic References
Generic: "There's an old mine in the Southwest" Specific: "New Mexico's rarest hike goes down an ancient pit"
State names anchor story. Region names are forgettable.

Mistake 5: Unclear "So What"
Unclear: "This building in Virginia has interesting history" Clear: "Virginia's Cold War cash vault is now a film archive you can visit"
Transformation (apocalypse prep → culture preservation) is inherently interesting.

Mistake 6: Same Format Repeatedly
Solution: Rotate through formats:
Mystery statements
Consequence/reversal
How questions
Corrective accusations
Travel hooks
Present-tense problems

Case Studies
Case Study 1: The Nuclear Bunker
Article content: "In 1969, the Fed built a secret bunker at Mount Pony in Culpeper, Virginia to save cash if nukes fell. The 400-foot bunker had foot-thick walls and held $4 billion in shrink-wrapped bills. It could house 540 people for a month. After the Cold War, the money left in 1988. The Packard Foundation bought it for $5.5 million in 1997 and turned it into the world's biggest film archive."
First attempts (too flat):
"Virginia's nuclear bunker became a cultural archive" (57)
"The Fed built this vault for nuclear war - Hollywood uses it now" (64)
"Mount Pony held enough cash to restart America after nuclear war" (69)
Why they failed:
"Nuclear bunker" is generic
Missing the absurd specifics ($4 billion! film reels!)
"Hollywood uses it" is vague
No visitability mentioned
Final version: "Virginia's Cold War cash vault is now a film archive you can visit" (68)
Why it works:
"Cash vault" is specific and surprising (not generic "bunker")
"Film archive" creates ironic contrast (doomsday → culture)
"You can visit" adds accessibility payoff
68 characters = perfect length
Present tense ("is") makes transformation feel current
Key lesson: Specificity creates intrigue. "Cash vault" beats "bunker." "$4 billion" beats "money." "Film archive" beats "cultural center."

Case Study 2: The Turquoise Mine
Article content: "Around 900 AD, Ancestral Puebloans found turquoise in Los Cerrillos, New Mexico. For 700 years, they dug with stone tools and fire. They carved a pit 130 feet deep and 200 feet wide. This was North America's largest prehistoric mining site. The turquoise moved along trade routes to Mexico and Canada. The stunning remains still dot the New Mexico landscape today."
Research revealed: Guided hikes available, visitors can walk down into the pit on rocky paths.
First attempts (statement of fact):
"New Mexico has a 130-foot pit carved entirely by hand over 700 years" (76)
"Ancestral Puebloans dug this New Mexico pit for 700 years straight" (67)
"This New Mexico turquoise mine supplied North America for seven centuries" (73)
"You can hike into the 130-foot pit one New Mexico tribe dug for seven centuries" (85)
Why they failed:
Pure facts with no emotion
No reason someone from Florida should care
"You can hike into" is clunky
700 years impressive but not visualized well
Missing the superlative angle
Final version: "New Mexico's rarest hike goes down an ancient pit that's 10-story deep" (72)
Why it works:
"Rarest hike" = superlative + implies special/hidden + establishes visitability
"Goes down" = active verb, creates sense of descent
"Ancient pit" = mystery without stating 700 years explicitly
"10-story deep" = visual scale anyone can picture (130 feet = abstract, 10 stories = concrete)
72 characters = ideal length
Implies the 700-year commitment without stating it (less is more)
Key lesson: Sometimes less detail is more powerful. "10-story deep" is more visceral than "130 feet." "Rarest" implies the 700-year uniqueness without spelling it out.

Case Study 3: The Toxic Town
Article content: "Gilman, Colorado was a mining town on a cliff. Lead and zinc mining made it prosperous. But decades of mining contaminated the soil and water with toxic metals. In 1984, EPA declared it a Superfund site. Residents were forced to evacuate. Today it's illegal to enter without permission due to contamination levels."
First attempts (too flat):
"Colorado has an abandoned mining town that's contaminated" (61)
"This Colorado town was evacuated due to toxic mining" (58)
"Gilman, Colorado is too toxic for humans" (46)
Why they failed:
Missing "cliffside" visual
"Contaminated" and "toxic" are abstract
No present-tense urgency
Too short or too vague
Final version: "Colorado has a cliffside town so toxic, it's illegal to go near it" (67)
Why it works:
"Cliffside town" = specific visual detail (mining town on cliff)
"So toxic, it's illegal" = shows extreme consequence
Present tense ("is illegal") makes it current
"Go near it" emphasizes danger (not just "enter")
67 characters = perfect length
The prohibition creates intrigue (why can't we go?)
Key lesson: Present-tense prohibition ("it's illegal") is more powerful than past-tense evacuation ("was evacuated"). Add visual details when available ("cliffside").

Case Study 4: The Trapped Warship
Article content: "In 1968, North Korea captured the USS Pueblo, a US Navy intelligence ship. One crew member died, 82 were held captive for 11 months. The ship was never returned. Today it sits in Pyongyang as a museum, the only commissioned US Navy ship held captive by a foreign nation."
First attempts (too factual):
"North Korea captured the USS Pueblo in 1968" (48)
"The USS Pueblo has been in North Korea since 1968" (54)
"North Korea still has a US Navy ship from the Cold War" (60)
Why they failed:
Too short
"Captured" feels past-tense, resolved
Missing the ongoing absurdity
No emotional weight
Final version: "There's a US warship trapped in North Korea since the Cold War" (67)
Why it works:
"Trapped" suggests ongoing helplessness (not just "captured" once)
"Since the Cold War" emphasizes absurd duration
Present tense ("There's") makes it current
Mystery statement format (stating strange fact)
67 characters = ideal length
"Warship" more dramatic than "ship"
Key lesson: Word choice creates emotion. "Trapped" (ongoing, helpless) beats "captured" (past event). "Since the Cold War" beats "in 1968" because it emphasizes how long it's been.

Case Study 5: The Erased Tribe
Article content: "Chief Ma-Ko-Ko-Mo of the St. Croix Chippewa signed an 1837 treaty ceding tribal lands. But he didn't understand it also terminated the tribe's federal recognition. For over 50 years, the St. Croix Chippewa didn't exist in the eyes of the US government. They lost rights, land, and identity until recognition was restored in the 1930s."
First attempts (too soft):
"This chief accidentally ended his tribe's federal recognition" (64)
"One signature erased the St. Croix Chippewa in 1837" (57)
"The St. Croix Chippewa lost federal recognition for 50 years" (67)
Why they failed:
"Accidentally" softens the injustice
Missing the dramatic single-action consequence
"Lost recognition" is bureaucratic, not emotional
Too short or unclear agency
Final version: "With one signature, this chief erased the St. Croix Chippewa for over half a century" (88)
Why it works:
"With one signature" = single devastating action
"Erased" = visceral, not bureaucratic ("terminated recognition")
"Over half a century" = emphasizes duration (beats "50 years")
Shows tragic consequence clearly
88 characters = upper range but justified by complexity
Consequence/reversal format creates narrative
Key lesson: "Erased" is more powerful than "terminated federal recognition." Lead with the action ("one signature") then the consequence ("erased for half a century").

Your Process When Given Article Content
Read the full article - Understand the complete story before writing titles


Identify the hook - What's the single most compelling element?


Is it a transformation? (bunker → archive)
Is it scale? (700 years, 10 stories deep)
Is it injustice? (tribe erased by signature)
Is it mystery? (warship trapped since Cold War)
Is it prohibition? (illegal to visit)
Check for missing details - Does article lack:


Specific measurements?
Visitability information?
Visual comparisons?
Current status?
Research if needed - Find missing details to strengthen hook


Stay completely on topic
Verify before claiming
Generate 10-15 title options - Use variety:


2-3 mystery statements
2-3 consequence/reversal
2-3 travel hooks (if visitable)
1-2 how questions
1-2 corrective/accusatory
1-2 present-tense problems
Check each title:


Hook in first 5 words?
65-90 characters?
Emotion + information?
Specific details not vague?
Present tense when possible?
No clickbait phrases?
Annotate character counts - Show (72) after each title


Present titles grouped by format - Make it easy to see variety



Output Format
When given article content, respond with:
Article Hook: [One sentence identifying the most compelling element]
Research Notes: [If you researched anything, briefly note what you found]
Title Options:
Direct Mystery Statement:
[Title option 1] (XX)
[Title option 2] (XX)
Consequence/Reversal:
[Title option 1] (XX)
[Title option 2] (XX)
Travel Hook:
[Title option 1] (XX)
[Title option 2] (XX)
[Continue through relevant formats]
Recommendation: [Which title you think works best and why in 1-2 sentences]

Final Reminders
Stay on topic - research enhances, never pivots
Hook first - most compelling element in first 5 words
Emotion matters - awe, curiosity, injustice, mystery, fear
Specifics beat vague - numbers, names, materials
Present tense - makes history feel immediate
No clickbait - audience wants substance
Rotate formats - variety keeps content fresh
Verify claims - research before stating as fact
## Writing Style

1. Use plain English, written at a 6th grade reading level.

2. Use strong nouns: a specific, detailed, and evocative word that paints a vivid picture, unlike a weak or general noun.

Examples:
Weak: small dog → Strong: Chihuahua, St. Bernard
Weak: fruit → Strong: apple
Weak: device → Strong: laptop
Weak: house → Strong: skyscraper, mansion, farmhouse 

3. Use powerful verbs: These are specific, descriptive verbs that convey more meaning and emotion than weaker, more general verbs, often without needing an adverb.

Examples:
Instead of "ran quickly," use "sprinted" or "dashed".
Instead of "walked slowly," use "shuffled" or "sauntered".
Instead of "said," use "whispered," "shouted," or "argued". 

**INPUT:**
TOPIC: {topic}

**OUTPUT:**
Generate the titles. 

Output format: Numbered list without headings"""

def authenticate_google_sheets():
    """Authenticate with Google Sheets API using token in Scripts folder"""
    creds = None
    
    # Look for JSON files in the same Scripts folder
    token_path = SCRIPT_DIR / "token.json"
    credentials_path = SCRIPT_DIR / "credentials.json"
    
    # Load existing token
    if token_path.exists():
        creds = Credentials.from_authorized_user_file(str(token_path))
    
    # If there are no (valid) credentials available, run auth flow
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(str(credentials_path), 
                ['https://www.googleapis.com/auth/spreadsheets'])
            creds = flow.run_local_server(port=0)
        
        # Save the credentials for the next run
        with open(token_path, 'w') as token:
            token.write(creds.to_json())
    
    return build('sheets', 'v4', credentials=creds)

def get_sheet_id(service, spreadsheet_id, sheet_name):
    """Get the sheet ID for a given sheet name"""
    sheet_metadata = service.spreadsheets().get(spreadsheetId=spreadsheet_id).execute()
    sheets = sheet_metadata.get('sheets', '')
    for sheet in sheets:
        if sheet['properties']['title'] == sheet_name:
            return sheet['properties']['sheetId']
    return None

def set_row_height_and_formatting(service, spreadsheet_id, row_number):
    """Set fixed row height and cell formatting"""
    sheet_id = get_sheet_id(service, spreadsheet_id, SHEET_NAME)
    
    requests = [
        # Set row height to fixed value (35 pixels)
        {
            'updateDimensionProperties': {
                'range': {
                    'sheetId': sheet_id,
                    'dimension': 'ROWS',
                    'startIndex': row_number - 1,  # 0-indexed
                    'endIndex': row_number
                },
                'properties': {
                    'pixelSize': 35
                },
                'fields': 'pixelSize'
            }
        },
        # Set cell formatting
        {
            'repeatCell': {
                'range': {
                    'sheetId': sheet_id,
                    'startRowIndex': row_number - 1,
                    'endRowIndex': row_number,
                    'startColumnIndex': 12,  # Column M
                    'endColumnIndex': 13
                },
                'cell': {
                    'userEnteredFormat': {
                        'wrapStrategy': 'CLIP',
                        'verticalAlignment': 'TOP',
                        'textFormat': {'fontSize': 11}
                    }
                },
                'fields': 'userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment,userEnteredFormat.textFormat.fontSize'
            }
        }
    ]
    
    service.spreadsheets().batchUpdate(
        spreadsheetId=spreadsheet_id,
        body={'requests': requests}
    ).execute()

def generate_titles_for_sheet():
    """Generate titles for Google Sheet"""
    
    # Authenticate with Google Sheets
    service = authenticate_google_sheets()
    sheet = service.spreadsheets()
    
    print("="*50)
    print("  TITLE GENERATOR")
    print("="*50)
    print()
    print("Reading data from Google Sheet...")
    
    # Read the sheet data
    result = sheet.values().get(spreadsheetId=SHEET_ID, 
                               range=f'{SHEET_NAME}!A:M').execute()
    values = result.get('values', [])
    
    if not values:
        print("No data found in sheet.")
        return
    
    # Find rows with "Ready for Titles" status
    rows_to_process = []
    for i, row in enumerate(values[1:], start=2):
        # Ensure row has enough columns
        while len(row) < 13:
            row.append('')
        
        status = row[7] if len(row) > 7 else ''  # Column H (index 7) - status column
        topic = row[8] if len(row) > 8 else ''  # Column I (index 8)
        
        if status == 'Ready for Titles' and topic:
            rows_to_process.append((i, topic))
    
    if not rows_to_process:
        print("No rows found with 'Ready for Titles' status.")
        return
    
    print(f"\nFound {len(rows_to_process)} rows with 'Ready for Titles' status")
    
    confirm = input("\nProceed with title generation? (Y/N): ").upper().strip()
    
    if confirm != 'Y':
        print("Cancelled.")
        return
    
    print("\nGenerating titles...")
    success_count = 0
    error_count = 0
    
    # Process each row
    for idx, (row_num, topic) in enumerate(rows_to_process, 1):
        print(f"\n[{idx}/{len(rows_to_process)}] Processing row {row_num}...")
        
        # Create prompt with the topic
        prompt = PROMPT_TEMPLATE.format(topic=topic)
        
        try:
            # Call Claude API
            response = client.messages.create(
                model="claude-opus-4-5-20251101",
                max_tokens=1000,
                messages=[{"role": "user", "content": prompt}]
            )
            
            # Update the sheet with generated titles
            titles_text = response.content[0].text
            
            # Write to column M and update status to "Titles Generated"
            sheet.values().batchUpdate(
                spreadsheetId=SHEET_ID,
                body={
                    'valueInputOption': 'RAW',
                    'data': [
                        {
                            'range': f'{SHEET_NAME}!M{row_num}',
                            'values': [[titles_text]]
                        },
                        {
                            'range': f'{SHEET_NAME}!H{row_num}',
                            'values': [['Titles Generated']]
                        }
                    ]
                }
            ).execute()
            
            # Set fixed row height and formatting
            set_row_height_and_formatting(service, SHEET_ID, row_num)
            
            print(f"  Success!")
            success_count += 1
            
            # Rate limiting - wait 2 seconds between requests
            if idx < len(rows_to_process):
                time.sleep(2)
            
        except Exception as e:
            print(f"  Error: {str(e)}")
            error_count += 1
            continue
    
    print("\n" + "="*50)
    print("COMPLETE")
    print("="*50)
    print(f"Successfully generated: {success_count} rows")
    if error_count > 0:
        print(f"Errors: {error_count} rows")

# Run the script
if __name__ == "__main__":
    try:
        generate_titles_for_sheet()
        input("\nPress Enter to exit...")
    except Exception as e:
        print(f"ERROR: {e}")
        import traceback
        traceback.print_exc()
        input("Press Enter to exit...")