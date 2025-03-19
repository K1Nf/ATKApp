using ATKApplication.Contracts.Request;
using ATKApplication.DataBase;
using ATKApplication.Models;
using CSharpFunctionalExtensions;
using Microsoft.EntityFrameworkCore;

namespace ATKApplication.Services
{
    public class ReportService(DataBaseContext _dB)
    {
        public async Task<Result<Report>> Get(Guid Id)
        {
            var report = await _dB.Reports
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.Id == Id);

            if (report == null)
            {
                return Result.Failure<Report>("Отчет не найден");
            }

            return report;
        }


        public async Task<Result<List<Report>>> GetAll()
        {
            var reports = await _dB.Reports
                .AsNoTracking()
                .ToListAsync();

            return reports;
        }


        public async Task<Result> Create(Guid tokenId, CreateReportRequest createReportRequest)
        {
            var newReport = Report.Create(createReportRequest.Name, createReportRequest.Startdate, createReportRequest.EndDate, tokenId);

            if (newReport != null)
            {
                await _dB.Reports.AddAsync(newReport);
                await _dB.SaveChangesAsync();
                return Result.Success();
            }

            return Result.Failure("Не удалось создать Отчет");
        }


        public async Task<Result> Update(Guid ReportId, Guid tokenId, UpdateReportRequest updateReportRequest)
        {
            int rows = await _dB.Reports
                .Where(x => x.Id == ReportId && x.OrganizerId == tokenId)
                    .ExecuteUpdateAsync(x => x
                        .SetProperty(p => p.Name, updateReportRequest.Name)
                        .SetProperty(p => p.Status, updateReportRequest.Status));

            if (rows == 1)
            {
                return Result.Success();
            }

            return Result.Failure("Отчет не найден");
        }


        public async Task<Result> Delete(Guid reportId)
        {
            // transaction???
            int deletedReportsCount = await _dB.Reports
                .Where(x => x.Id == reportId)
                .ExecuteDeleteAsync();
            
            if (deletedReportsCount == 1)
            {
                return Result.Success();
            }

            return Result.Failure("Что-то пошло не так!");
        }


        public async Task<Result> AddEvents(Guid reportId, List<Guid> eventsId)
        {
            using var transaction = _dB.Database.BeginTransactionAsync();

            eventsId.ForEach(x =>
            {
                ReportAndEvent reportAndEvent = new()
                {
                    Created_At = DateTime.UtcNow,
                    EventId = x,
                    ReportId = reportId,
                };

                _dB.ReportAndEvents.AddAsync(reportAndEvent);
            });

            await _dB.SaveChangesAsync();
            await _dB.Database.CommitTransactionAsync();
            // catch exceptions

            return Result.Success();
        }

        public async Task<Result> DeleteEvents(Guid reportId, List<Guid> eventsId)
        {
            using var transaction = _dB.Database.BeginTransactionAsync();

            await _dB.ReportAndEvents
                .Where(x => x.ReportId == reportId && eventsId.Contains(x.EventId))
                .ExecuteDeleteAsync();

            await _dB.SaveChangesAsync();
            await _dB.Database.CommitTransactionAsync();
            // catch exceptions

            return Result.Success();
        }
    }
}
