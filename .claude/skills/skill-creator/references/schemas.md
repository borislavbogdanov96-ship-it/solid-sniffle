# JSON Schemas

JSON structures used by skill-creator for evaluation, grading, and benchmarking.

## evals.json

Located at `evals/evals.json` within the skill directory.

```json
{
  "skill_name": "example-skill",
  "evals": [
    {
      "id": 1,
      "prompt": "User's example prompt",
      "expected_output": "Description of expected result",
      "files": ["evals/files/sample1.pdf"],
      "expectations": [
        "The output includes X",
        "The skill used script Y"
      ]
    }
  ]
}
```

## history.json

Tracks version progression in Improve mode. Located at workspace root.

```json
{
  "started_at": "2026-01-15T10:30:00Z",
  "skill_name": "pdf",
  "current_best": "v2",
  "iterations": [
    {
      "version": "v0",
      "parent": null,
      "expectation_pass_rate": 0.65,
      "grading_result": "baseline",
      "is_current_best": false
    }
  ]
}
```

## grading.json

Output from the grader agent. Located at `<run-dir>/grading.json`.

```json
{
  "expectations": [
    {
      "text": "The output includes the name 'John Smith'",
      "passed": true,
      "evidence": "Found in transcript Step 3: 'Extracted names: John Smith, Sarah Johnson'"
    }
  ],
  "summary": {
    "passed": 2,
    "failed": 1,
    "total": 3,
    "pass_rate": 0.67
  },
  "execution_metrics": {
    "tool_calls": { "Read": 5, "Write": 2, "Bash": 8 },
    "total_tool_calls": 15,
    "total_steps": 6,
    "errors_encountered": 0,
    "output_chars": 12450,
    "transcript_chars": 3200
  },
  "timing": {
    "executor_duration_seconds": 165.0,
    "grader_duration_seconds": 26.0,
    "total_duration_seconds": 191.0
  },
  "claims": [
    {
      "claim": "The form has 12 fillable fields",
      "type": "factual",
      "verified": true,
      "evidence": "Counted 12 fields in field_info.json"
    }
  ],
  "user_notes_summary": {
    "uncertainties": [],
    "needs_review": [],
    "workarounds": []
  },
  "eval_feedback": {
    "suggestions": [],
    "overall": "No suggestions, evals look solid."
  }
}
```

**Important**: The `expectations` array must use `text`, `passed`, and `evidence` fields exactly — the viewer depends on these field names.

## metrics.json

Output from the executor. Located at `<run-dir>/outputs/metrics.json`.

```json
{
  "tool_calls": {
    "Read": 5,
    "Write": 2,
    "Bash": 8
  },
  "total_tool_calls": 18,
  "total_steps": 6,
  "errors_encountered": 0,
  "output_chars": 12450,
  "transcript_chars": 3200
}
```

## timing.json

Records wall-clock timing. Located at `<run-dir>/timing.json`.

```json
{
  "total_tokens": 84852,
  "duration_ms": 23332,
  "total_duration_seconds": 23.3
}
```

**Important**: Capture this data immediately upon task completion — it comes through the task notification and isn't persisted elsewhere.

## benchmark.json

Output from aggregate_benchmark.py. Contains statistical summaries across multiple runs.

```json
{
  "metadata": {
    "skill_name": "my-skill",
    "generated_at": "2026-01-15T10:30:00Z",
    "workspace": "path/to/workspace/iteration-1"
  },
  "run_summary": [
    {
      "configuration": "with_skill",
      "pass_rate": { "mean": 0.85, "stddev": 0.05, "min": 0.80, "max": 0.90 },
      "time_seconds": { "mean": 45.2, "stddev": 3.1 },
      "tokens": { "mean": 12500, "stddev": 800 }
    },
    {
      "configuration": "without_skill",
      "pass_rate": { "mean": 0.40, "stddev": 0.10, "min": 0.30, "max": 0.50 },
      "time_seconds": { "mean": 38.5, "stddev": 2.8 },
      "tokens": { "mean": 9200, "stddev": 600 }
    }
  ],
  "delta": {
    "pass_rate": "+0.45",
    "time_seconds": "+6.7",
    "tokens": "+3300"
  },
  "runs": []
}
```

**Important**: The `configuration` field must match exactly for proper viewer display. Put `with_skill` before baseline counterparts.

## comparison.json

Output from the blind comparator agent.

```json
{
  "winner": "A",
  "reasoning": "Output A provides a complete solution...",
  "rubric": {
    "A": { "content_score": 4.7, "structure_score": 4.3, "overall_score": 9.0 },
    "B": { "content_score": 2.7, "structure_score": 2.7, "overall_score": 5.4 }
  },
  "output_quality": {
    "A": { "score": 9, "strengths": [], "weaknesses": [] },
    "B": { "score": 5, "strengths": [], "weaknesses": [] }
  }
}
```

## analysis.json

Output from the post-hoc analyzer agent.

```json
{
  "comparison_summary": { "winner": "A", "comparator_reasoning": "..." },
  "winner_strengths": [],
  "loser_weaknesses": [],
  "instruction_following": { "winner": { "score": 9, "issues": [] }, "loser": { "score": 6, "issues": [] } },
  "improvement_suggestions": [
    { "priority": "high", "category": "instructions", "suggestion": "...", "expected_impact": "..." }
  ],
  "transcript_insights": { "winner_execution_pattern": "...", "loser_execution_pattern": "..." }
}
```
