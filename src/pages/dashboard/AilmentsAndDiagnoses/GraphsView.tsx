/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { IDiagnosesAndAilments } from "../../../types";
import { useTranslation } from "react-i18next";

import "../styles/styles.scss";
import { useMemo } from "react";

type GraphsViewProps = {
  data: IDiagnosesAndAilments[];
  isLoading: boolean;
};

/**
 * A React functional component that renders a view with graphs.
 * @param {GraphsViewProps} data - The data to be displayed in the graphs.
 * @param {boolean} isLoading - A flag indicating whether the data is currently being loaded.
 * @returns The rendered view with graphs.
 */
export const GraphsView = ({ data, isLoading }: GraphsViewProps) => {
  const { t } = useTranslation();

  const graphBySex = useMemo(
    () => [
      {
        name: t("male"),
        masculino: 0,
      },
      {
        name: t("female"),
        femenino: 0,
      },
    ],
    [t],
  );

  const graphByDiagnosisType = useMemo(
    () => [
      {
        name: "Clinico",
        clinico: 0,
      },
      {
        name: "Genetico",
        genetico: 0,
      },
    ],
    [],
  );

  const graphByGeneticType = useMemo(
    () => [
      {
        name: "FISH",
        FISH: 0,
      },
      {
        name: "METHYLATION",
        METHYLATION: 0,
      },
      {
        name: "MLPA",
        MLPA: 0,
      },
    ],
    [],
  );

  const graphByFISH = useMemo(
    () => [
      {
        name: "Masculino",
        masculino: 0,
      },
      {
        name: "Femenino",
        femenino: 0,
      },
    ],
    [],
  );

  const graphByMLPA = useMemo(
    () => [
      {
        name: "Masculino",
        masculino: 0,
      },
      {
        name: "Femenino",
        femenino: 0,
      },
    ],
    [],
  );

  const graphByMethylation = useMemo(
    () => [
      {
        name: "Masculino",
        masculino: 0,
      },
      {
        name: "Femenino",
        femenino: 0,
      },
    ],
    [],
  );

  const graphByAilment = useMemo(
    () => [
      { name: t("OVERWEIGHT"), OVERWEIGHT: 0 },
      { name: t("OBESITY"), OBESITY: 0 },
      { name: t("TYPE_2_DIABETES"), TYPE_2_DIABETES: 0 },
      { name: t("BEHAVIOURAL_PROBLEMS"), BEHAVIOURAL_PROBLEMS: 0 },
      { name: t("LANGUAGE_PROBLEMS"), LANGUAGE_PROBLEMS: 0 },
      { name: t("RESPIRATORY_PROBLEMS"), RESPIRATORY_PROBLEMS: 0 },
      { name: t("GROWTH_HORMONE_DEFICIENCY"), GROWTH_HORMONE_DEFICIENCY: 0 },
      { name: t("SCOLIOSIS"), SCOLIOSIS: 0 },
      { name: t("HYPOTHYROIDISM"), HYPOTHYROIDISM: 0 },
      { name: t("GASTROINTESTINAL_PROBLEMS"), GASTROINTESTINAL_PROBLEMS: 0 },
      { name: t("SKIN_PROBLEMS"), SKIN_PROBLEMS: 0 },
      { name: t("CIRCULATORY_PROBLEMS"), CIRCULATORY_PROBLEMS: 0 },
      { name: t("DENTAL_PROBLEMS"), DENTAL_PROBLEMS: 0 },
      { name: "otros", otros: 0 },
    ],
    [t],
  );

  if (!data.length || isLoading) {
    return <>{t("no data")}</>;
  }

  data.forEach((beneficiary) => {
    if (beneficiary.geneticDiagnosis) {
      graphByDiagnosisType[1].genetico++;
    } else {
      graphByDiagnosisType[0].clinico++;
    }

    if (beneficiary.typeOfDiagnosis === "FISH") {
      graphByGeneticType[0].FISH++;
      if (beneficiary.sex) {
        graphByFISH[1].femenino++;
      } else {
        graphByFISH[0].masculino++;
      }
    } else if (beneficiary.typeOfDiagnosis === "MLPA") {
      graphByGeneticType[2].MLPA++;
      if (beneficiary.sex) {
        graphByMLPA[1].femenino++;
      } else {
        graphByMLPA[0].masculino++;
      }
    } else if (beneficiary.typeOfDiagnosis === "METHYLATION") {
      graphByGeneticType[1].METHYLATION++;
      if (beneficiary.sex) {
        graphByMethylation[1].femenino++;
      } else {
        graphByMethylation[0].masculino++;
      }
    }

    if (beneficiary.sex) {
      graphBySex[0].masculino++;
    } else {
      graphBySex[1].femenino++;
    }

    beneficiary.otherAilments.forEach((ailment) => {
      switch (ailment) {
        case "OVERWEIGHT":
          graphByAilment[0].OVERWEIGHT++;
          break;
        case "OBESITY":
          graphByAilment[1].OBESITY++;
          break;
        case "TYPE_2_DIABETES":
          graphByAilment[2].TYPE_2_DIABETES++;
          break;
        case "BEHAVIOURAL_PROBLEMS":
          graphByAilment[3].BEHAVIOURAL_PROBLEMS++;
          break;
        case "LANGUAGE_PROBLEMS":
          graphByAilment[4].LANGUAGE_PROBLEMS++;
          break;
        case "RESPIRATORY_PROBLEMS":
          graphByAilment[5].RESPIRATORY_PROBLEMS++;
          break;
        case "GROWTH_HORMONE_DEFICIENCY":
          graphByAilment[6].GROWTH_HORMONE_DEFICIENCY++;
          break;
        case "SCOLIOSIS":
          graphByAilment[7].SCOLIOSIS++;
          break;
        case "HYPOTHYROIDISM":
          graphByAilment[8].HYPOTHYROIDISM++;
          break;
        case "GASTROINTESTINAL_PROBLEMS":
          graphByAilment[9].GASTROINTESTINAL_PROBLEMS++;
          break;
        case "SKIN_PROBLEMS":
          graphByAilment[10].SKIN_PROBLEMS++;
          break;
        case "CIRCULATORY_PROBLEMS":
          graphByAilment[11].CIRCULATORY_PROBLEMS++;
          break;
        case "DENTAL_PROBLEMS":
          graphByAilment[12].DENTAL_PROBLEMS++;
          break;
        default:
          graphByAilment[13].otros++;
          break;
      }
    });
  });

  return (
    <section className="graphs-container">
      <div>
        <p>{t("total beneficiaries")}</p>
        <BarChart
          width={400}
          height={300}
          data={graphBySex}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar
            barSize={40}
            dataKey="masculino"
            fill="#AE196F"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            barSize={40}
            dataKey="femenino"
            fill="#FF9BD5"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </div>
      <div>
        <p>{t("diagnostic test")}</p>
        <BarChart
          width={400}
          height={300}
          data={graphByDiagnosisType}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar
            barSize={40}
            dataKey="genetico"
            fill="#AE196F"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            barSize={40}
            dataKey="clinico"
            fill="#FF9BD5"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </div>
      <div>
        <p style={{ width: "fit-content" }}>{t("genetic diagnostic")}</p>
        <BarChart
          width={400}
          height={300}
          data={graphByGeneticType}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar
            barSize={40}
            dataKey="FISH"
            fill="#AE196F"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            barSize={40}
            dataKey="MLPA"
            fill="#FF9BD5"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
          <Bar
            barSize={40}
            dataKey="METHYLATION"
            fill="#AE196F"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </div>

      <div>
        <p>{t("FISH diagnostic")}</p>
        <BarChart
          width={400}
          height={300}
          data={graphByFISH}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar
            barSize={40}
            dataKey="masculino"
            fill="#AE196F"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            barSize={40}
            dataKey="femenino"
            fill="#FF9BD5"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </div>

      <div>
        <p>{t("MLPA diagnostic")}</p>
        <BarChart
          width={400}
          height={300}
          data={graphByMLPA}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar
            barSize={40}
            dataKey="masculino"
            fill="#AE196F"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            barSize={40}
            dataKey="femenino"
            fill="#FF9BD5"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </div>

      <div>
        <p>{t("methylation diagnostic")}</p>
        <BarChart
          width={400}
          height={300}
          data={graphByMethylation}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar
            barSize={40}
            dataKey="masculino"
            fill="#AE196F"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            barSize={40}
            dataKey="femenino"
            fill="#FF9BD5"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </div>

      <div
        className="align-center"
        style={{ maxWidth: "800px", overflow: "scroll" }}
      >
        <p>{t("ailments")}</p>
        <BarChart
          width={3600}
          height={300}
          data={graphByAilment}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            barSize={40}
            dataKey="OVERWEIGHT"
            fill="#AE196F"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            barSize={40}
            dataKey="OBESITY"
            fill="#FF9BD5"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
          <Bar
            barSize={40}
            dataKey="TYPE_2_DIABETES"
            fill="#AE196F"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
          <Bar
            barSize={40}
            dataKey="BEHAVIOURAL_PROBLEMS"
            fill="#FF9BD5"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
          <Bar
            barSize={40}
            dataKey="LANGUAGE_PROBLEMS"
            fill="#AE196F"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
          <Bar
            barSize={40}
            dataKey="RESPIRATORY_PROBLEMS"
            fill="#FF9BD5"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
          <Bar
            barSize={40}
            dataKey="GROWTH_HORMONE_DEFICIENCY"
            fill="#AE196F"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
          <Bar
            barSize={40}
            dataKey="SCOLIOSIS"
            fill="#FF9BD5"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
          <Bar
            barSize={40}
            dataKey="HYPOTHYROIDISM"
            fill="#AE196F"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
          <Bar
            barSize={40}
            dataKey="GASTROINTESTINAL_PROBLEMS"
            fill="#FF9BD5"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
          <Bar
            barSize={40}
            dataKey="SKIN_PROBLEMS"
            fill="#AE196F"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
          <Bar
            barSize={40}
            dataKey="CIRCULATORY_PROBLEMS"
            fill="#FF9BD5"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
          <Bar
            barSize={40}
            dataKey="DENTAL_PROBLEMS"
            fill="#AE196F"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </div>
    </section>
  );
};
