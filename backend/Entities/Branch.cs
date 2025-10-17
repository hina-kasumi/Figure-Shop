using backend.Entities.Base;

namespace backend.Entities;

public class Branch : BaseEntity
{
    private string _name = "";

    public required string Name
    {
        get => _name;
        set
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                throw new ArgumentException("Name cannot be null or whitespace.", nameof(Name));
            }

            _name = value;
        }
    }

    public ICollection<Figure> Figures { get; set; } = [];
}