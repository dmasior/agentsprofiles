---
label: "RabbitMQ"
group: "infra"
aliases: ["amqp"]
---
## rules
- Declare queues and exchanges as durable and publish persistent messages for important data.
- Acknowledge a message only after it is processed.
- Make consumers idempotent. Messages can arrive more than once.
- Use a dead letter exchange for messages that fail.
- Set a prefetch count to limit unacknowledged messages per consumer.

## ask-first
- Delete or purge a queue that holds production messages.
