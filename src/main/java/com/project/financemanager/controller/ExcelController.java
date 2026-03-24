package com.project.financemanager.controller;

import com.project.financemanager.service.ExcelService;
import com.project.financemanager.service.ExpenseService;
import com.project.financemanager.service.IncomeService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/excel")
@RequiredArgsConstructor
public class ExcelController {

    private final ExcelService excelService;
    private final IncomeService incomeService;
    private final ExpenseService expenseService;

    @GetMapping("/download/income")
    public void downloadIncomeExcel(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer month,
            HttpServletResponse response) throws IOException {
        if (year == null) year = java.time.LocalDate.now().getYear();
        if (month == null) month = java.time.LocalDate.now().getMonthValue();

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=income.xlsx");
        excelService.writeIncomesToExcel(response.getOutputStream(),
                incomeService.getIncomesForUserByMonth(year, month));
    }

    @GetMapping("/download/expense")
    public void downloadExpenseExcel(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer month,
            HttpServletResponse response) throws IOException {
        if (year == null) year = java.time.LocalDate.now().getYear();
        if (month == null) month = java.time.LocalDate.now().getMonthValue();

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=expense.xlsx");
        excelService.writeExpensesToExcel(response.getOutputStream(),
                expenseService.getExpensesForUserByMonth(year, month));
    }
}
