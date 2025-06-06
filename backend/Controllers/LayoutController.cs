using DtcBackend.Models;
using DtcBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace DtcBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LayoutController : ControllerBase
{
    private readonly LayoutService _layoutService;

    public LayoutController(LayoutService layoutService)
    {
        _layoutService = layoutService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Layout>>> Get() =>
        await _layoutService.GetAllAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<Layout>> Get(string id)
    {
        var layout = await _layoutService.GetByIdAsync(id);
        if (layout is null) return NotFound();
        return layout;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Layout layout)
    {
        await _layoutService.CreateAsync(layout);
        return CreatedAtAction(nameof(Get), new { id = layout.id }, layout);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, [FromBody] Layout layout)
    {
        var existing = await _layoutService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        layout.id = id;
        await _layoutService.UpdateAsync(id, layout);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var existing = await _layoutService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        await _layoutService.DeleteAsync(id);
        return NoContent();
    }
}
