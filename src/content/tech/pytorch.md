---
label: "PyTorch"
group: "data-ml"
aliases: ["torch"]
---
## rules
- Set seeds with `torch.manual_seed` and log them.
- Choose the device once and move models and tensors to it explicitly.
- Call `model.train()` and `model.eval()` at the right time.
- Use `torch.no_grad()` or `torch.inference_mode()` for evaluation and inference.
- Save and load `state_dict`, not the whole model object.
