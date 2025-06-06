using DtcBackend.Models;
using DtcBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace DtcBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GlobalController : ControllerBase
{
    private readonly GlobalService _globalService;

    public GlobalController(GlobalService globalService)
    {
        _globalService = globalService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Globals>>> Get() =>
        await _globalService.GetAllAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Globals>> GetById(string id)
    {
        var global = await _globalService.GetByIdAsync(id);
        if (global is null) return NotFound();
        return global;
    }

    [HttpGet("name/{name}")]
    public async Task<ActionResult<Globals>> GetByName(string name)
    {
        var global = await _globalService.GetByNameAsync(name);
        if (global is null) return NotFound();
        return global;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Globals global)
    {
        await _globalService.CreateAsync(global);
        return CreatedAtAction(nameof(GetById), new { id = global.id }, global);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, [FromBody] Globals updated)
    {
        var existing = await _globalService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        updated.id = id;
        await _globalService.UpdateAsync(id, updated);
        return NoContent();
    }

    [HttpPatch("{id:length(24)}/settings")]
    public async Task<IActionResult> UpdateSettings(string id, [FromBody] BlockSettings settings)
    {
        var existing = await _globalService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        await _globalService.UpdateSettingsAsync(id, settings);
        return NoContent();
    }

    [HttpPut("{id:length(24)}/data")]
    public async Task<IActionResult> UpdateData(string id, [FromBody] Dictionary<string, object> data)
    {
        var existing = await _globalService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        await _globalService.UpdateDataAsync(id, data);
        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var existing = await _globalService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        await _globalService.DeleteAsync(id);
        return NoContent();
    }
}
