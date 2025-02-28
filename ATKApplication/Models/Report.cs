using ATKApplication.Enums;

namespace ATKApplication.Models;

public class Report
{
    private Report(string name, DateOnly startDate, DateOnly endDate, Guid organizerId)
    {
        Id = Guid.NewGuid();
        Name = name;
        StartDate = startDate;
        EndDate = endDate;
        OrganizerId = organizerId;
    }


    public Guid Id { get; init; }
    public string Name { get; set; }
    public DateOnly StartDate { get; init; }
    public DateOnly EndDate { get; init; }
    public ReportStatus Status { get; set; } = ReportStatus.Created;
    public DateTime Created_At { get; set; } = DateTime.UtcNow;
    public Guid OrganizerId { get; set; }
    public Organization? Organizer { get; set; }
    public List<Event> Events { get; private set; } = [];



    public static Report Create(string name, DateOnly startDate, DateOnly endDate, Guid organizerId)
    {
        Console.WriteLine("Создаем новый отчет");
        return new Report(name, startDate, endDate, organizerId);
    }



    public void AddEvents(params Event[] events)
    {
        if(Status == ReportStatus.Sent)
        {
            return;
        }

        foreach (var @event in events)
        {
            if (@event.OrganizerId == OrganizerId && StartDate < @event.Date && @event.Date < EndDate && @event.Status == EventStatus.Completed)
            {
                Events.Add(@event);
                Console.WriteLine("Мероприятие \"" + @event.Name + "\" добавлено в отчет \"" + Name + "\"!");
            }
            else
            {
                Console.WriteLine("Мероприятие \"" + @event.Name + "\" не добавлено в отчет");
            }
        }
    }



    public void RemoveEvent(Event @event)
    {
        if (Status == ReportStatus.Sent)
        {
            return;
        }

        if (@event.OrganizerId == OrganizerId && Events.Contains(@event))
        {
            Events.Remove(@event);
            Console.WriteLine("Мероприятие \"" + @event.Name + "\" удалено из отчета \"" + Name + "\"!");
            return;
        }
        Console.WriteLine("Мероприятие \"" + @event.Name + "\" не удалено из отчета");
    }



    public bool CanSendReport()
    {
        if(Events.Any(e => e.Status != EventStatus.Completed))
        {
            Console.WriteLine("Некоторые мероприятия еще не проведены! Отчет не отправлен!");
            return false;
        }

        Status = ReportStatus.Sent;
        // логика уведомлений???
        Console.WriteLine($"Отчет по плану \"{Name}\" успешно отправлен");
        return true;
    }


    
    public int CalculateRating()
    {
        Console.WriteLine("Расчитываем новый рейтинг организации");
        return 1;
    }



    public void GetDetails()
    {
        Console.WriteLine($"Информация по отчету \"{Name}\":");
        Console.WriteLine("  1. Период подсчета: " + StartDate + " - " + EndDate);
        Console.WriteLine("  2. Статус: " + Status);
        Console.WriteLine("  3. Количество мероприятий: " + Events.Count);

        var categoriesAndEvents = Events
            .SelectMany(e => e.CategoryAndEvents)
            .ToList()
            .Select(x => new
            {
                CategoryName = x.Category!.Name,
                Number = x.Count
            })
            .ToList();

        var categoriesGroupped = categoriesAndEvents
            .GroupBy(x => x.CategoryName)
            .Select(x => new
            {
                CategoryName = x.Key,
                Number = x.Sum(x => x.Number)
            })
            .ToList();


        Console.WriteLine("  4. Среднее количество посетителей мероприятий: " + categoriesGroupped.Average(e => e.Number));
        Console.WriteLine("  5. Всего участников по категориям:");
        categoriesGroupped.ForEach(x => Console.WriteLine("    -" + x.CategoryName + ": " + x.Number));


        Console.WriteLine("  6. Количество мероприятий по типам: ");
        var evs = Events
            .GroupBy(e => e.EventType)
            .ToList();

        evs.ForEach(e => Console.WriteLine("    -" + e.Key + ": " + e.Count()));
        Console.WriteLine();
    }
}

