using DtcBackend.Models;
using DtcBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace DtcBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlockController : ControllerBase
{
    private readonly BlockDefinitionService _blockService;

    public BlockController(BlockDefinitionService blockService)
    {
        _blockService = blockService;
    }

    [HttpGet]
    public async Task<ActionResult<List<BlockDefinition>>> Get() =>
        await _blockService.GetAllAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<BlockDefinition>> Get(string id)
    {
        var block = await _blockService.GetByIdAsync(id);
        if (block is null) return NotFound();
        return block;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] BlockDefinition block)
    {
        await _blockService.CreateAsync(block);
        return CreatedAtAction(nameof(Get), new { id = block.id }, block);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, [FromBody] BlockDefinition block)
    {
        var existing = await _blockService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        block.id = id;
        await _blockService.UpdateAsync(id, block);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var existing = await _blockService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        await _blockService.DeleteAsync(id);
        return NoContent();
    }
}
