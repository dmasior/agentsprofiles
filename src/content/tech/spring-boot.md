---
label: "Spring Boot"
group: "backend"
aliases: ["spring"]
---
## rules
- Use constructor injection. Do not use field injection with `@Autowired`.
- Bind config with `@ConfigurationProperties`.
- Validate request bodies with `@Valid` and Bean Validation annotations.
- Put `@Transactional` on service methods, not on controllers.
- Use slice tests such as `@WebMvcTest` and `@DataJpaTest`. Use `@SpringBootTest` only for full integration tests.
- Manage schema changes with the migration tool of the repo (Flyway or Liquibase).
