---
label: "Kafka"
group: "infra"
---
## rules
- Make consumers idempotent. Messages can arrive more than once.
- Choose the message key from the entity whose events must stay in order.
- Use a schema registry or versioned schemas for message formats.
- Commit offsets only after the message is processed.
- Send messages that fail many times to a dead letter topic.

## ask-first
- Delete a topic, change its partition count or reset consumer offsets.
