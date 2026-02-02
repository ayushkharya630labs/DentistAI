# DentistAI – Product Requirements Document (PRD)

## 1. Project Overview

**Goal:**  
Build a multimodal AI agent capable of analyzing user-uploaded dental images (intraoral photos, X-rays) to identify general issues (e.g., plaque, cavities, gum recession) and provide actionable, non-diagnostic advice.

**Key Differentiator:**  
The system must be trainable — its accuracy improves over time based on feedback from real dentists or labeled data.

---

## 2. User Personas & Stories

### End User (Patient)
> "As a user, I want to upload a photo of my teeth and describe my pain so that I can get a preliminary idea of what might be wrong before visiting a clinic."

### Admin (Dentist / Trainer)
> "As a domain expert, I want to review the AI's analysis and correct its mistakes so that the model learns to identify specific dental conditions more accurately."

---

## 3. Functional Requirements

### A. The “Eye” (Image Analysis)

**Input**
- Accept high-resolution images (JPEG / PNG)
- Uploaded via chat interface

**Detection Capabilities**
- **Surface Issues:** discoloration, plaque buildup, visible calculus (tartar)
- **Gum Health:** redness, swelling (gingivitis indicators), recession
- **Structural:** chipped teeth, visible cavities (caries), crowding/alignment issues

**Output**
- Generate a *Findings Report*
- Include confidence scores  
  Example:
  ```
  Potential cavity detected on lower-left molar (Confidence: 85%)
  ```

---

### B. The “Brain” (Conversational Agent)

**Contextual Interview**
The agent asks follow-up questions based on findings:

- If gum redness is detected →  
  *"Does this area bleed when you brush?"*

- If a dark spot is detected →  
  *"Do you feel sensitivity to hot or cold in this tooth?"*

**Disclaimer Enforcement**
Every response must include:

> ⚠️ Not a medical diagnosis

---

### C. The “Training” (Feedback Loop)

**Correction Interface**
- Expert grading system
- Thumbs Up / Down
- Optional text correction

**Dataset Accumulation**
- Automatically store:
  - uploaded image
  - corrected diagnosis
- Save into storage bucket for future training

---

## 4. Technical Architecture (Google Vertex AI Stack)

### Core Components

#### Vertex AI Agent Builder (Conversational)
- Use **Multimodal Agent**
- System Instructions persona:
  > "You are a helpful, empathetic dental assistant. You identify visual anomalies but never confirm a medical diagnosis."

#### Model: Gemini 1.5 Pro
- Superior multimodal capabilities
- Handles text + images
- Large context window
- Replaces need for OCR or separate vision model (MVP phase)

---

### Knowledge Base (RAG)

**Vertex AI Search**
- Index:
  - dental textbooks
  - ADA guidelines
  - labeled dental image atlases

Purpose:
- Ground responses
- Prevent hallucinated diagnoses

---

## 5. Trainable Pipeline Architecture

### Data Storage

- **Google Cloud Storage (GCS)**  
  Stores user-uploaded images

- **BigQuery**  
  Stores:
  - conversation logs
  - expert feedback
  - corrections

---

### Fine-Tuning Loop

1. Export corrected interactions from BigQuery
2. Convert data → JSONL format
3. Run **Vertex AI Supervised Tuning**
4. Tune Gemini 1.5 Pro
5. Deploy tuned model to replace previous version

---

## Disclaimer

DentistAI provides **educational guidance only**.  
It does not provide medical diagnoses.  
Users must consult licensed dental professionals for treatment.

---

## Future Roadmap

- Real-time dentist review dashboard
- Federated feedback learning
- Multi-language support
- 3D dental imaging integration
- HIPAA-compliant deployment

---

**DentistAI — AI-assisted dental awareness, not diagnosis.**
