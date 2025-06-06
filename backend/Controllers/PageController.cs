using DtcBackend.Models;
using DtcBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace DtcBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PageController : ControllerBase
{
    private readonly PageService _pageService;

    public PageController(PageService pageService)
    {
        _pageService = pageService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Page>>> Get() =>
        await _pageService.GetAllAsync();

    [HttpGet("url")]
    public async Task<ActionResult<Page>> GetByUrl([FromQuery] string url)
    {
        var page = await _pageService.GetFullPageByUrlAsync(url);
        if (page is null) return NotFound($"Page with url '{url}' not found.");
        return Ok(page);
    }

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Page>> GetById(string id)
    {
        var page = await _pageService.GetByIdAsync(id);
        if (page is null) return NotFound();
        return Ok(page);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Page page)
    {
        await _pageService.CreateAsync(page);
        return CreatedAtAction(nameof(GetById), new { id = page.id }, page);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, [FromBody] Page page)
    {
        var existing = await _pageService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        page.id = id;
        await _pageService.UpdateAsync(id, page);
        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var existing = await _pageService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        await _pageService.DeleteAsync(id);
        return NoContent();
    }
}
