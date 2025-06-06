using DtcBackend.Models;
using DtcBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace DtcBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ThemeController : ControllerBase
{
    private readonly ThemeService _themeService;

    public ThemeController(ThemeService themeService)
    {
        _themeService = themeService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Theme>>> Get() =>
        await _themeService.GetAllAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<Theme>> Get(string id)
    {
        var theme = await _themeService.GetByIdAsync(id);
        if (theme is null) return NotFound();
        return theme;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Theme theme)
    {
        await _themeService.CreateAsync(theme);
        return CreatedAtAction(nameof(Get), new { id = theme.id }, theme);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, [FromBody] Theme theme)
    {
        var existing = await _themeService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        theme.id = id;
        await _themeService.UpdateAsync(id, theme);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var existing = await _themeService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        await _themeService.DeleteAsync(id);
        return NoContent();
    }
}
