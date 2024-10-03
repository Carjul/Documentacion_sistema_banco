import React, { useEffect } from 'react';
import './App.css';
import imgARQ from './assets/diagram_arquitectura.png';
import imgEDR from './assets/diagram_er.png';
import imgDFG from './assets/gerente.png';
import imgDFA from './assets/asesor.png';
import imgDFC from './assets/cajero.png';

import hljs from 'highlight.js/lib/core';
import sql from 'highlight.js/lib/languages/sql';
import 'highlight.js/styles/atom-one-dark.css'; // Usa cualquier tema que prefieras

hljs.registerLanguage('sql', sql);

function App() {
  useEffect(() => {
    hljs.highlightAll(); // Resalta todos los bloques <code> cuando se renderiza el componente
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sistema Bancario Distribuido</h1>
        <a href="https://portafolio-carlosramos.vercel.app/" target='_blank'><p>About me</p></a>
        <a href="https://github.com/Carjul" target='_blank'><p>Github</p></a>

      </header>

      <section>
        <h2>Descripción General</h2>
        <p>Este sistema proporciona una gestión bancaria distribuida, permitiendo a cada sucursal gestionar sus propios datos de clientes y cuentas de forma independiente, mientras que la información crítica se gestiona de forma centralizada.</p>
      </section>

      <section>
        <h2>Requerimientos</h2>
        <ol>
          <li><strong>Distribución de Datos:</strong>  Cada sucursal gestiona sus clientes y cuentas, con acceso centralizado para consultas globales.</li>
          <li><strong>Seguridad y Privacidad:</strong>  Sistema robusto de gestión de contraseñas (bcrypt o scrypt), control de acceso basado en roles (cajero, asesor, gerente).</li>
          <li><strong>Gestión Centralizada:</strong> Préstamos, tarjetas de crédito y atención al cliente se gestionan en la base de datos central.</li>
          <li><strong>Interoperabilidad y Sincronización:</strong> Transacciones reflejadas en tiempo real entre sucursales (se recomienda un sistema de mensajería).</li>
          <li><strong>Auditoría y Monitoreo:</strong>  Registro de todas las acciones en la base de datos central.</li>
          <li><strong>Automatización de Usuarios y Contraseñas:</strong>  Creación automatizada de usuarios con gestión de credenciales.</li>
        </ol>
      </section>

      <section>
        <h2>Arquitectura</h2>
        <p>El sistema utiliza una arquitectura de base de datos distribuida con una base de datos central y bases de datos en cada sucursal.  Las relaciones se gestionan utilizando `postgres_fdw`.</p>
        <h3>Diagrama Entidad-Relación (ER)</h3>
        <div className="diagram-container">
          {/* Aquí insertarás tu imagen del diagrama ER */}
          <img src={imgEDR}  width ='80%'  alt="Diagrama Entidad-Relación" />
        </div>
        <h3>Diagrama de la Arquitectura</h3>
        <div className="diagram-container">
          {/* Aquí insertarás tu imagen del diagrama de arquitectura */}
          <img src={imgARQ}  width ='60%' height={'100%'} loading='lazy' alt="Diagrama de la Arquitectura" />
        </div>
        <h3>Diagrama de flujo gerente</h3>
        <div className="diagram-container">
          {/* Aquí insertarás tu imagen del diagrama de arquitectura */}
          <img src={imgDFG}  width ='60%' height={'100%'} loading='lazy' alt="Diagrama de la Arquitectura" />
        </div>
        <h3>Diagrama de flujo asesor_financiero</h3>
        <div className="diagram-container">
          {/* Aquí insertarás tu imagen del diagrama de arquitectura */}
          <img src={imgDFA}  width ='60%' height={'100%'} loading='lazy' alt="Diagrama de la Arquitectura" />
        </div>
        <h3>Diagrama flujo rol cajero</h3>
        <div className="diagram-container">
          {/* Aquí insertarás tu imagen del diagrama de arquitectura */}
          <img src={imgDFC}  width ='60%' height={'100%'} loading='lazy' alt="Diagrama de la Arquitectura" />
        </div>
      </section>
      <section>
        <h2>SQL Schema</h2>
        <p>El siguiente esquema SQL describe las tablas y relaciones necesarias para implementar el sistema bancario distribuido.  Asegúrate de ajustar el esquema según los requisitos específicos de tu aplicación.</p>
     
      </section>
    

      <section className="sql-section">
        <h2 className="section-title">Tablas central</h2>
        <div className="mockup-code">
          <pre><code className="language-sql">
            {`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- Habilitar la extensión uuid-ossp

-- Crear la tabla de Préstamos
CREATE TABLE Prestamos (
    id_prestamo UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_cliente UUID,
    monto DECIMAL(12, 2),
    tasa_interes DECIMAL(5, 2),
    fecha_aprobacion DATE, 
    estado_prestamo VARCHAR(50)
);

-- Crear la tabla de Tarjetas de Crédito
CREATE TABLE Tarjetas_Credito (
    id_tarjeta UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_cliente UUID,
    limite_credito DECIMAL(12, 2),
    saldo_disponible DECIMAL(12, 2),
    fecha_emision DATE DEFAULT CURRENT_DATE,
    estado VARCHAR(50)
);

-- Crear la tabla de Atención a Clientes
CREATE TABLE Atencion_Clientes (
    id_ticket UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_cliente UUID,
    fecha_ticket DATE DEFAULT CURRENT_DATE,
    asunto TEXT,
    estado_ticket VARCHAR(50) 
		CONSTRAINT estado_ticket_check CHECK (estado_ticket IN ('Abierto', 'Cerrado', 'En Proceso'))
);

-- Tabla de auditoría
CREATE TABLE audit_log (
    audit_id SERIAL PRIMARY KEY,
    user_id VARCHAR(50),
    action VARCHAR(50),
    timestamp TIMESTAMP DEFAULT current_timestamp,
    table_name VARCHAR(50),
    record_id UUID,
    old_data JSONB,
    new_data JSONB
);

-- Tabla de Usuarios
CREATE TABLE Usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,  -- Nombre del usuario
    contraseña TEXT NOT NULL,                    -- Contraseña encriptada
    rol VARCHAR(50) NOT NULL,                    -- Rol asignado (cajero, asesor, gerente)
    creado_en TIMESTAMP DEFAULT current_timestamp
);
`}
          </code></pre>
        </div>
      </section>
      <section className="sql-section">
        <h2 className="section-title">Tablas Sucursal</h2>
        <div className="mockup-code">
          <pre><code className="language-sql">
            {`-- Tablas de cada sucursal (ej. en Sucursal 1)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";  -- Habilitar la extensión uuid-ossp

-- Tabla de Sucursales
CREATE TABLE Sucursales (
    id_sucursal UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_sucursal VARCHAR(100),
    ubicacion VARCHAR(255)
);

-- Tabla de Clientes
CREATE TABLE Clientes (
    id_cliente UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_cliente VARCHAR(100),
    direccion VARCHAR(255),
    tel_cliente VARCHAR(20),
    correo_cliente VARCHAR(100),
	CONSTRAINT correo_cliente_check CHECK (correo_cliente ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$') -- Validar formato de correo

);

-- Tabla de Cuentas
CREATE TABLE Cuentas (
    id_cuenta UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_cliente UUID REFERENCES Clientes(id_cliente),
    tipo_cuenta VARCHAR(50),
    saldo DECIMAL(12, 2),
    fecha_apertura DATE DEFAULT CURRENT_DATE,
    id_sucursal UUID REFERENCES Sucursales(id_sucursal),
	CONSTRAINT tipo_cuenta_check CHECK (tipo_cuenta IN ('Ahorros', 'Corriente', 'Inversión')) -- Validar tipo de cuenta

);

-- Tabla de transacciones
CREATE TABLE Transacciones (
    id_transaccion UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_cuenta UUID REFERENCES Cuentas(id_cuenta),
    tipo_transaccion VARCHAR(50),
    monto DECIMAL(12, 2),
    fecha DATE DEFAULT CURRENT_DATE,
    id_sucursal UUID REFERENCES Sucursales(id_sucursal),
	CONSTRAINT tipo_transaccion_check CHECK (tipo_transaccion IN ('Depósito', 'Retiro', 'Transferencia')) -- Validar tipo de transacción

);

-- Tabla de auditoría
CREATE TABLE audit_log (
    audit_id SERIAL PRIMARY KEY,
    user_id VARCHAR(50),
    action VARCHAR(50),
    timestamp TIMESTAMP DEFAULT current_timestamp,
    table_name VARCHAR(50),
    record_id UUID,
    old_data JSONB,
    new_data JSONB
);

-- Tabla de Usuarios
CREATE TABLE Usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,  -- Nombre del usuario
    contraseña TEXT NOT NULL,                    -- Contraseña encriptada
    rol VARCHAR(50) NOT NULL,                    -- Rol asignado (cajero, asesor, gerente)
    creado_en TIMESTAMP DEFAULT current_timestamp
);

--Crea realaciones entre tablas
CREATE INDEX idx_cliente ON Cuentas(id_cliente);
CREATE INDEX idx_sucursal ON Cuentas(id_sucursal);
CREATE INDEX idx_transaccion_cuenta ON Transacciones(id_cuenta);

`}
          </code></pre>
        </div>
      </section>
      <section className="sql-section">
        <h2 className="section-title">Roles Sistema Bancarío</h2>
        <div className="mockup-code">
          <pre><code className="language-sql">{`
-- Crear el rol de Cajero
CREATE ROLE cajero LOGIN PASSWORD 'password_cajero';
-- Permisos para gestionar cuentas y transacciones asociadas a una sucursal específica
GRANT SELECT, INSERT, UPDATE ON Cuentas, Transacciones TO cajero;
-- Permitir consultar clientes, pero solo para lectura
GRANT SELECT ON Clientes TO cajero;
-- Permitir ver las sucursales para que pueda seleccionar la sucursal en la que trabaja
GRANT SELECT ON Sucursales TO cajero;

-- Crear el rol de Asesor Financiero
CREATE ROLE asesor_financiero LOGIN PASSWORD 'password_asesor';
-- Permisos para gestionar préstamos, tarjetas de crédito y atención al cliente
GRANT SELECT, INSERT, UPDATE ON Prestamos, Tarjetas_Credito, Atencion_Clientes TO asesor_financiero;
-- Permitir consultar clientes y cuentas, pero solo para lectura
GRANT SELECT ON Clientes, Cuentas TO asesor_financiero;

-- Crear el rol de Gerente
CREATE ROLE gerente LOGIN PASSWORD 'password_gerente';
-- El gerente tiene acceso completo a todas las tablas en el esquema 
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO gerente;

-- Function crear user

CREATE OR REPLACE FUNCTION crear_usuario(
    p_nombre_usuario VARCHAR(50),
    p_contraseña VARCHAR(50),
    p_rol VARCHAR(50)
) RETURNS VOID AS $$
BEGIN
	CREATE EXTENSION IF NOT EXISTS pgcrypto;
    -- Verificar que el rol proporcionado sea válido
    IF p_rol NOT IN ('cajero', 'asesor_financiero', 'gerente') THEN
        RAISE EXCEPTION 'Rol no válido. Los roles permitidos son: cajero, asesor_financiero, gerente';
    END IF;
    
    -- Insertar el nuevo usuario con la contraseña encriptada
    INSERT INTO Usuarios (nombre_usuario, contraseña, rol)
    VALUES (p_nombre_usuario, crypt(p_contraseña, gen_salt('bf')), p_rol);
    
    -- Crear el rol en PostgreSQL si no existe
    EXECUTE format('CREATE ROLE %I LOGIN PASSWORD %L', p_nombre_usuario, p_contraseña);

    -- Asignar permisos basados en el rol
    EXECUTE format('GRANT %I TO %I', p_rol, p_nombre_usuario);
    
    RAISE NOTICE 'Usuario % creado con éxito', p_nombre_usuario;
END;
$$ LANGUAGE plpgsql;

-- Ejemplo de uso
SELECT crear_usuario('juan_cajero', 'contraseña_inicial', 'cajero');

-- Function cambiar contraseña

CREATE OR REPLACE FUNCTION crear_usuario(
    p_nombre_usuario VARCHAR(50),
    p_contraseña VARCHAR(50),
    p_rol VARCHAR(50)
) RETURNS VOID AS $$
BEGIN
	CREATE EXTENSION IF NOT EXISTS pgcrypto;
    -- Verificar que el rol proporcionado sea válido
    IF p_rol NOT IN ('cajero', 'asesor_financiero', 'gerente') THEN
        RAISE EXCEPTION 'Rol no válido. Los roles permitidos son: cajero, asesor_financiero, gerente';
    END IF;
    
    -- Insertar el nuevo usuario con la contraseña encriptada
    INSERT INTO Usuarios (nombre_usuario, contraseña, rol)
    VALUES (p_nombre_usuario, crypt(p_contraseña, gen_salt('bf')), p_rol);
    
    -- Crear el rol en PostgreSQL si no existe
    EXECUTE format('CREATE ROLE %I LOGIN PASSWORD %L', p_nombre_usuario, p_contraseña);

    -- Asignar permisos basados en el rol
    EXECUTE format('GRANT %I TO %I', p_rol, p_nombre_usuario);
    
    RAISE NOTICE 'Usuario % creado con éxito', p_nombre_usuario;
END;
$$ LANGUAGE plpgsql;

-- Ejemplo de uso
SELECT crear_usuario('juan_cajero', 'contraseña_inicial', 'cajero');
`}
          </code></pre>
        </div>
      </section>
      <section className="sql-section">
        <h2 className="section-title">Funciones</h2>
        <div className="mockup-code">
        <pre><code className="language-sql">{
`
-- Función para crear una conexión remota a la central

CREATE OR REPLACE FUNCTION create_remote_central_connection(
    p_server_name TEXT,
    p_host TEXT,
    p_dbname TEXT,
    p_port TEXT,
    p_user TEXT,
    p_password TEXT,
    p_local_user TEXT,
    p_schema TEXT,
    p_tables TEXT[]
)
RETURNS VOID AS $$
DECLARE
    fdw_exists BOOLEAN;
    server_exists BOOLEAN;
    table_list TEXT;
BEGIN
    -- Check if postgres_fdw extension exists
    SELECT EXISTS (
        SELECT 1 FROM pg_extension WHERE extname = 'postgres_fdw'
    ) INTO fdw_exists;

    -- Install postgres_fdw if it doesn't exist
    IF NOT fdw_exists THEN
        CREATE EXTENSION postgres_fdw;
    END IF;

    -- Check if the server already exists
    SELECT EXISTS (
        SELECT 1 FROM pg_foreign_server WHERE srvname = p_server_name
    ) INTO server_exists;

    -- Create the foreign server if it doesn't exist
    IF NOT server_exists THEN
        EXECUTE format('
            CREATE SERVER %I
            FOREIGN DATA WRAPPER postgres_fdw
            OPTIONS (host %L, dbname %L, port %L)
        ', p_server_name, p_host, p_dbname, p_port);
    ELSE
        -- Update the server if it already exists
        EXECUTE format('
            ALTER SERVER %I
            OPTIONS (SET host %L, SET dbname %L, SET port %L)
        ', p_server_name, p_host, p_dbname, p_port);
    END IF;

    -- Create or update the user mapping
    EXECUTE format('
        CREATE USER MAPPING IF NOT EXISTS FOR %I
        SERVER %I
        OPTIONS (user %L, password %L)
    ', p_local_user, p_server_name, p_user, p_password);

    -- Prepare the table list for IMPORT FOREIGN SCHEMA
    IF array_length(p_tables, 1) > 0 THEN
        table_list := 'LIMIT TO (' || array_to_string(p_tables, ', ') || ')';
    ELSE
        table_list := '';
    END IF;

    -- Import the foreign schema
    EXECUTE format('
        IMPORT FOREIGN SCHEMA %I %s
        FROM SERVER %I
        INTO %I
    ', p_schema, table_list, p_server_name, p_schema);

    RAISE NOTICE 'Remote connection created successfully for server: %', p_server_name;
EXCEPTION
    WHEN others THEN
        RAISE EXCEPTION 'Error creating remote connection: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;

--ejemplo de uso
SELECT create_remote_central_connection(
    'banco_central',           -- server name
    '172.18.0.1',              -- host
    'CentralBanco',            -- database name
    '5432',                    -- port
    'admin',                   -- remote user
    '12345',                   -- password
    'admin',                   -- local user
    'public',                  -- schema
    ARRAY['Prestamos', 'Atencion_Clientes', 'Tarjetas_Credito']  -- tables to import
);

-- Función para crear una conexión remota a una sucursal y se crea un nuevo esquema en la central con el server name para evitar coliciones.

CREATE OR REPLACE FUNCTION create_remote_sucursal_connection(
    p_server_name TEXT,
    p_host TEXT,
    p_dbname TEXT,
    p_port TEXT,
    p_remote_user TEXT,
    p_remote_password TEXT,
    p_local_user TEXT,
    p_tables TEXT[]
)
RETURNS VOID AS $$
DECLARE
    fdw_exists BOOLEAN;
    server_exists BOOLEAN;
    user_mapping_exists BOOLEAN;
    schema_name TEXT;
    table_list TEXT;
    drop_query TEXT;
    foreign_table RECORD;
BEGIN
    -- Set the schema name
    schema_name :=  p_server_name;

    -- Check if postgres_fdw extension exists
    SELECT EXISTS (
        SELECT 1 FROM pg_extension WHERE extname = 'postgres_fdw'
    ) INTO fdw_exists;

    -- Install postgres_fdw if it doesn't exist
    IF NOT fdw_exists THEN
        EXECUTE 'CREATE EXTENSION postgres_fdw';
    END IF;

    -- Check if the server already exists
    SELECT EXISTS (
        SELECT 1 FROM pg_foreign_server WHERE srvname = p_server_name
    ) INTO server_exists;

    -- Create or update the foreign server
    IF NOT server_exists THEN
        EXECUTE format('
            CREATE SERVER %I
            FOREIGN DATA WRAPPER postgres_fdw
            OPTIONS (host %L, dbname %L, port %L)
        ', p_server_name, p_host, p_dbname, p_port);
    ELSE
        EXECUTE format('
            ALTER SERVER %I
            OPTIONS (SET host %L, SET dbname %L, SET port %L)
        ', p_server_name, p_host, p_dbname, p_port);
    END IF;

    -- Check if user mapping exists
    SELECT EXISTS (
        SELECT 1 FROM pg_user_mappings
        WHERE srvname = p_server_name AND usename = p_local_user
    ) INTO user_mapping_exists;

    -- Create or update the user mapping
    IF user_mapping_exists THEN
        EXECUTE format('
            ALTER USER MAPPING FOR %I
            SERVER %I
            OPTIONS (SET user %L, SET password %L)
        ', p_local_user, p_server_name, p_remote_user, p_remote_password);
    ELSE
        EXECUTE format('
            CREATE USER MAPPING FOR %I
            SERVER %I
            OPTIONS (user %L, password %L)
        ', p_local_user, p_server_name, p_remote_user, p_remote_password);
    END IF;

    -- Create the schema if it doesn't exist
    EXECUTE format('
        CREATE SCHEMA IF NOT EXISTS %I
    ', schema_name);

    -- Prepare the table list for IMPORT FOREIGN SCHEMA
    IF array_length(p_tables, 1) > 0 THEN
        table_list := 'LIMIT TO (' || array_to_string(p_tables, ', ') || ')';
    ELSE
        table_list := '';
    END IF;

    -- Drop existing foreign tables in the target schema
    FOR foreign_table IN 
        SELECT foreign_table_name
        FROM information_schema.foreign_tables 
        WHERE foreign_table_schema = schema_name
    LOOP
        drop_query := format('DROP FOREIGN TABLE IF EXISTS %I.%I CASCADE', schema_name, foreign_table.foreign_table_name);
        EXECUTE drop_query;
    END LOOP;

    -- Import the foreign schema
    EXECUTE format('
        IMPORT FOREIGN SCHEMA public %s
        FROM SERVER %I
        INTO %I
    ', table_list, p_server_name, schema_name);

    RAISE NOTICE 'Remote connection created successfully for server: % in schema: %', p_server_name, schema_name;
EXCEPTION
    WHEN others THEN
        RAISE EXCEPTION 'Error creating remote connection: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;

--ejemplo de instanciar function
SELECT create_remote_sucursal_connection(
    'sucursal_1',              -- server name
    '172.18.0.1',              -- host
    'SucursalBanco',           -- database name
    '5433',                    -- port
    'admin',                   -- remote user
    '12345',                   -- remote password
    'admin',                   -- local user
    ARRAY['Clientes', 'Cuentas', 'Transacciones']  -- tables to import
);
        
-- Función para auditar las operaciones en las tablas
CREATE OR REPLACE FUNCTION audit_function() RETURNS trigger AS $$
DECLARE
    key_field TEXT;
    key_value UUID;  -- Cambiado a UUID para reflejar el tipo de la clave primaria
BEGIN
    -- Obtener el nombre del campo clave primario de la tabla afectada
    SELECT attname INTO key_field
    FROM pg_index i
    JOIN pg_attribute a ON a.attrelid = i.indrelid
    AND a.attnum = ANY(i.indkey)
    WHERE i.indrelid = TG_RELID
    AND i.indisprimary;

    -- Construir la clave primaria de manera dinámica usando EXECUTE
    IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
        EXECUTE 'SELECT ($1).' || key_field INTO key_value USING NEW;
    ELSIF (TG_OP = 'DELETE') THEN
        EXECUTE 'SELECT ($1).' || key_field INTO key_value USING OLD;
    END IF;

    -- Registrar la operación de INSERT
    IF (TG_OP = 'INSERT') THEN
        INSERT INTO public.audit_log(user_id, action, timestamp, table_name, record_id, new_data)
        VALUES (current_user, TG_OP, current_timestamp, TG_TABLE_NAME, key_value, row_to_json(NEW));
        RETURN NEW;
    -- Registrar la operación de UPDATE
    ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO public.audit_log(user_id, action, timestamp, table_name, record_id, old_data, new_data)
        VALUES (current_user, TG_OP, current_timestamp, TG_TABLE_NAME, key_value, row_to_json(OLD), row_to_json(NEW));
        RETURN NEW;
    -- Registrar la operación de DELETE
    ELSIF (TG_OP = 'DELETE') THEN
        INSERT INTO public.audit_log(user_id, action, timestamp, table_name, record_id, old_data)
        VALUES (current_user, TG_OP, current_timestamp, TG_TABLE_NAME, key_value, row_to_json(OLD));
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Funcion validar cuenta se usa para buscar la exixtencia del cliente para la integridad de los datos en la centrañ

CREATE OR REPLACE FUNCTION validar_cuenta_remota()
RETURNS TRIGGER AS $$
DECLARE
    cuenta_existente UUID;
    esquema TEXT;
    query TEXT;
BEGIN
    -- Recorrer todos los esquemas que no sean "public"
    FOR esquema IN
        SELECT schema_name
        FROM information_schema.schemata
        WHERE schema_name <> 'public'
    LOOP
        -- Construir la consulta dinámica para verificar en la tabla "Cuentas" de cada esquema
        query := format('SELECT id_cliente FROM %I.Cuentas WHERE id_cliente = $1', esquema);

        -- Ejecutar la consulta en cada esquema
        EXECUTE query INTO cuenta_existente USING NEW.id_cliente;

        -- Si encuentra la cuenta, salir del loop
        IF cuenta_existente IS NOT NULL THEN
            EXIT;
        END IF;
    END LOOP;

    -- Si no se encontró en ningún esquema, lanzar un error
    IF cuenta_existente IS NULL THEN
        RAISE EXCEPTION 'No existe una cuenta para el cliente con id % en ninguna sucursal', NEW.id_cliente;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- function transferencía entre cuentas de diferente sucursal, desde db central.

CREATE OR REPLACE FUNCTION transferencia_interbancaria(
    p_id_cuenta_origen UUID,
    p_id_cuenta_destino UUID,
    p_monto DECIMAL
) RETURNS VOID AS $$
DECLARE
    esquema TEXT;
    saldo_origen DECIMAL;
    cuenta_encontrada BOOLEAN := FALSE;
    cuenta_destino_encontrada BOOLEAN := FALSE;
    id_sucursal_origen UUID;
    id_sucursal_destino UUID;
BEGIN
    -- Iniciar la transacción
    RAISE NOTICE 'Iniciando la transacción de % a % por un monto de %', p_id_cuenta_origen, p_id_cuenta_destino, p_monto;
    
    -- Recorrer todos los esquemas que no sean esquemas del sistema (sólo esquemas de sucursales)
    FOR esquema IN
        SELECT schema_name
        FROM information_schema.schemata
        WHERE schema_name NOT IN ('public', 'information_schema', 'pg_catalog', 'pg_toast', 'pg_temp_1', 'pg_toast_temp_1')
    LOOP
        RAISE NOTICE 'Iterando esquema: %', esquema;

        -- Verificar si la cuenta de origen está en este esquema
        EXECUTE format('SELECT saldo, id_sucursal FROM %I.Cuentas WHERE id_cuenta = $1', esquema)
        INTO saldo_origen, id_sucursal_origen
        USING p_id_cuenta_origen;

        IF saldo_origen IS NOT NULL THEN
            cuenta_encontrada := TRUE;
            RAISE NOTICE 'Cuenta de origen encontrada en el esquema % con saldo: %', esquema, saldo_origen;
            
            -- Verificar si hay saldo suficiente en la cuenta de origen
            IF saldo_origen < p_monto THEN
                RAISE EXCEPTION 'Saldo insuficiente en la cuenta de origen';
            END IF;

            -- Restar el monto en la cuenta de origen
            EXECUTE format('UPDATE %I.Cuentas SET saldo = saldo - $1 WHERE id_cuenta = $2', esquema)
            USING p_monto, p_id_cuenta_origen;

            RAISE NOTICE 'Saldo actualizado en la cuenta de origen en el esquema %', esquema;

            -- Registrar la transacción en la tabla de Transacciones del esquema de la cuenta de origen con monto negativo
            EXECUTE format('INSERT INTO %I.Transacciones (id_transaccion, id_cuenta, tipo_transaccion, monto, fecha, id_sucursal) 
                            VALUES (uuid_generate_v4(), $1, ''Transferencia'', $2 * -1, CURRENT_DATE, $3)', esquema)
            USING p_id_cuenta_origen, p_monto, id_sucursal_origen;

            RAISE NOTICE 'Transacción de retiro registrada en el esquema % con monto negativo', esquema;
        END IF;

        -- Verificar si la cuenta de destino está en este esquema
        EXECUTE format('SELECT saldo, id_sucursal FROM %I.Cuentas WHERE id_cuenta = $1', esquema)
        INTO saldo_origen, id_sucursal_destino
        USING p_id_cuenta_destino;

        IF saldo_origen IS NOT NULL THEN
            cuenta_destino_encontrada := TRUE;
            RAISE NOTICE 'Cuenta de destino encontrada en el esquema % con saldo: %', esquema, saldo_origen;

            -- Sumar el monto en la cuenta de destino
            EXECUTE format('UPDATE %I.Cuentas SET saldo = saldo + $1 WHERE id_cuenta = $2', esquema)
            USING p_monto, p_id_cuenta_destino;

            RAISE NOTICE 'Saldo actualizado en la cuenta de destino en el esquema %', esquema;

            -- Registrar la transacción en la tabla de Transacciones del esquema de la cuenta de destino
            EXECUTE format('INSERT INTO %I.Transacciones (id_transaccion, id_cuenta, tipo_transaccion, monto, fecha, id_sucursal) 
                            VALUES (uuid_generate_v4(), $1, ''Transferencia'', $2, CURRENT_DATE, $3)', esquema)
            USING p_id_cuenta_destino, p_monto, id_sucursal_destino;

            RAISE NOTICE 'Transacción de depósito registrada en el esquema %', esquema;
        END IF;
    END LOOP;

    -- Verificar si las cuentas fueron encontradas
    IF NOT cuenta_encontrada THEN
        RAISE EXCEPTION 'La cuenta de origen no se encontró en ninguna sucursal';
    ELSIF NOT cuenta_destino_encontrada THEN
        RAISE EXCEPTION 'La cuenta de destino no se encontró en ninguna sucursal';
    END IF;

    -- Transacción completada con éxito
    RAISE NOTICE 'Transacción completada con éxito entre las cuentas % y %', p_id_cuenta_origen, p_id_cuenta_destino;

EXCEPTION
    WHEN OTHERS THEN
        -- Si algo sale mal, lanzar el error
        RAISE NOTICE 'Ocurrió un error durante la transacción.';
        RAISE;
END;
$$ LANGUAGE plpgsql;

-- Ejemplo de uso
SELECT transferencia_interbancaria(
    p_id_cuenta_origen UUID,
    p_id_cuenta_destino UUID,
    p_monto DECIMAL
)

-- Function para depositar dinero en cuentas de una suscursal.

CREATE OR REPLACE FUNCTION Depositar(
    _id_cuenta UUID,
    _monto DECIMAL(12,2),
    _id_sucursal UUID
)
RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
    _id_transaccion UUID;
BEGIN
    -- Verificar que la cuenta exista y pertenezca a la sucursal
    IF NOT EXISTS (SELECT 1 FROM Cuentas WHERE id_cuenta = _id_cuenta AND id_sucursal = _id_sucursal) THEN
        RAISE EXCEPTION 'La cuenta no existe o no pertenece a esta sucursal';
    END IF;

    -- Generar un nuevo UUID para la transacción
    _id_transaccion := uuid_generate_v4();

    -- Registrar la transacción
    INSERT INTO Transacciones (id_transaccion, id_cuenta, tipo_transaccion, monto, fecha, id_sucursal)
    VALUES (_id_transaccion, _id_cuenta, 'Depósito', _monto, CURRENT_DATE, _id_sucursal);

    -- Incrementar el saldo de la cuenta
    UPDATE Cuentas SET saldo = saldo + _monto WHERE id_cuenta = _id_cuenta;

    -- Retornar el ID de la transacción
    RETURN _id_transaccion;

EXCEPTION 
    WHEN OTHERS THEN
        -- La transacción se revierte automáticamente aquí
        RAISE;
END;
$$;

-- Function para retira dinero en cuentas de una suscursal.

CREATE OR REPLACE FUNCTION public.retiro(
	_id_cuenta uuid,
	_monto numeric,
	_id_sucursal uuid)
    RETURNS uuid
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    _id_transaccion UUID;
    _saldo_actual DECIMAL(12,2);
BEGIN
    -- Verificar que la cuenta exista y pertenezca a la sucursal
    IF NOT EXISTS (SELECT 1 FROM Cuentas WHERE id_cuenta = _id_cuenta AND id_sucursal = _id_sucursal) THEN
        RAISE EXCEPTION 'La cuenta no existe o no pertenece a esta sucursal';
    END IF;

    -- Obtener el saldo actual de la cuenta
    SELECT saldo INTO _saldo_actual FROM Cuentas WHERE id_cuenta = _id_cuenta;

    -- Verificar si hay fondos suficientes
    IF _saldo_actual < _monto THEN
        RAISE EXCEPTION 'Saldo insuficiente para realizar el retiro';
    END IF;

    -- Generar un nuevo UUID para la transacción
    _id_transaccion := uuid_generate_v4();

    -- Registrar la transacción
    INSERT INTO Transacciones (id_transaccion, id_cuenta, tipo_transaccion, monto, fecha, id_sucursal)
    VALUES (_id_transaccion, _id_cuenta, 'Retiro', _monto * 1, CURRENT_DATE, _id_sucursal);

    -- Decrementar el saldo de la cuenta
    UPDATE Cuentas SET saldo = saldo - _monto WHERE id_cuenta = _id_cuenta;

    -- Retornar el ID de la transacción
    RETURN _id_transaccion;

EXCEPTION 
    WHEN OTHERS THEN
        -- La transacción se revierte automáticamente aquí
        RAISE;
END;
$BODY$;

-- Ejemplo de uso:

SELECT * FROM public.retiro('uuid_cuenta', 'monto', 'uuid_sucursal');

--Function para  buscar un cliente de todas las sucursales desde central.

CREATE OR REPLACE FUNCTION buscar_cliente_en_sucursales(p_id_cliente UUID)
RETURNS TABLE (
    sucursal TEXT,
    id_cliente UUID,
    nombre_cliente VARCHAR,
    direccion VARCHAR,
    tel_cliente VARCHAR,
    correo_cliente VARCHAR
) AS $$
DECLARE
    esquema TEXT;
BEGIN
    -- Iterar sobre todos los esquemas que no son esquemas del sistema
    FOR esquema IN
        SELECT schema_name
        FROM information_schema.schemata
        WHERE schema_name NOT IN ('public', 'information_schema', 'pg_catalog', 'pg_toast', 'pg_temp_1', 'pg_toast_temp_1')
    LOOP
        -- Ejecutar consulta para cada esquema y devolver la información del cliente
        RETURN QUERY EXECUTE format(
            'SELECT %L AS sucursal, c.id_cliente, c.nombre_cliente, c.direccion, c.tel_cliente, c.correo_cliente
             FROM %I.Clientes c WHERE c.id_cliente = $1', esquema, esquema)
        USING p_id_cliente;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

--  Ejemplo de uso:

SELECT * FROM buscar_cliente_en_sucursales('id_cliente');

--Function para obtener transaciones en todas las sucursales desde central.

CREATE OR REPLACE FUNCTION obtener_transacciones_sucursales(p_tipo_transaccion VARCHAR)
RETURNS TABLE (
    sucursal TEXT,
    id_transaccion UUID,
    monto DECIMAL,
    fecha DATE,
    id_cuenta UUID
) AS $$
DECLARE
    esquema TEXT;
BEGIN
    -- Iterar sobre todos los esquemas que no son esquemas del sistema
    FOR esquema IN
        SELECT schema_name
        FROM information_schema.schemata
        WHERE schema_name NOT IN ('public', 'information_schema', 'pg_catalog', 'pg_toast', 'pg_temp_1', 'pg_toast_temp_1')
    LOOP
        -- Ejecutar consulta para cada esquema y devolver las transacciones, convirtiendo el timestamp a date
        RETURN QUERY EXECUTE format(
            'SELECT %L AS sucursal, t.id_transaccion, t.monto, t.fecha::date, t.id_cuenta
             FROM %I.Transacciones t WHERE t.tipo_transaccion = $1', esquema, esquema)
        USING p_tipo_transaccion;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Ejemplo de uso:

SELECT * FROM obtener_transacciones_sucursales('tipo transacción');

--Function para obtener saldo total del banco por sucursal.

CREATE OR REPLACE FUNCTION obtener_saldo_total_sucursales()
RETURNS TABLE (
    sucursal TEXT,
    saldo_total DECIMAL
) AS $$
DECLARE
    esquema TEXT;
BEGIN
    -- Iterar sobre todos los esquemas que no son esquemas del sistema
    FOR esquema IN
        SELECT schema_name
        FROM information_schema.schemata
        WHERE schema_name NOT IN ('public', 'information_schema', 'pg_catalog', 'pg_toast', 'pg_temp_1', 'pg_toast_temp_1')
    LOOP
        -- Ejecutar consulta para cada esquema y devolver el saldo total por sucursal
        RETURN QUERY EXECUTE format(
            'SELECT %L AS sucursal, SUM(c.saldo) AS saldo_total
             FROM %I.Cuentas c', esquema, esquema);
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Ejemplo de uso:

SELECT * FROM obtener_saldo_total_sucursales();


`}</code></pre>
        </div>
      </section>

      <section className="sql-section">
        <h2 className="section-title">Triggers</h2>
        <div className="mockup-code">
          <pre><code className="language-sql">{`
-- Trigger para auditar las operaciones en las tablas de la base de datos central

CREATE TRIGGER atencion_clientes_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON Atencion_Clientes
FOR EACH ROW
EXECUTE FUNCTION audit_function();

CREATE TRIGGER prestamos_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON Prestamos
FOR EACH ROW
EXECUTE FUNCTION audit_function();

CREATE TRIGGER tarjetas_credido_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON Tarjetas_Credito
FOR EACH ROW
EXECUTE FUNCTION audit_function();

-- Trigger para auditar las operaciones en las tablas de la base de datos sucursal

CREATE TRIGGER transacciones_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON Transacciones
FOR EACH ROW
EXECUTE FUNCTION audit_function();

CREATE TRIGGER cuentas_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON Cuentas
FOR EACH ROW
EXECUTE FUNCTION audit_function();

CREATE TRIGGER cuentas_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON Clientes
FOR EACH ROW
EXECUTE FUNCTION audit_function();

CREATE TRIGGER cuentas_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON Sucursales
FOR EACH ROW
EXECUTE FUNCTION audit_function();


-- Trigger para ejecutar validar cliente antes de insertar en tablas de la central.

CREATE TRIGGER trigger_validar_cuenta_remota
BEFORE INSERT ON Prestamos
FOR EACH ROW
EXECUTE FUNCTION validar_cuenta_remota();

CREATE TRIGGER trigger_validar_cuenta_remota
BEFORE INSERT ON  Tarjetas_Credito
FOR EACH ROW
EXECUTE FUNCTION validar_cuenta_remota();

CREATE TRIGGER trigger_validar_cuenta_remota
BEFORE INSERT ON Atencion_Clientes
FOR EACH ROW
EXECUTE FUNCTION validar_cuenta_remota();

          `}</code></pre>
        </div>
      </section>

      
      <section className="sql-section">
        <h2 className="section-title">Consultas</h2>
        <div className="mockup-code">
          <pre><code className="language-sql">{`

-- 1. Consulta para verificar los datos de una cuenta específica por cliente

SELECT c.nombre_cliente, cu.id_cuenta , cu.tipo_cuenta, cu.saldo
FROM Clientes c
JOIN Cuentas cu ON c.id_cliente = cu.id_cliente
WHERE c.id_cliente = 'UUID'; --id cliente 

-- 2. Consulta para validar las transacciones de una cuenta en un periodo de tiempo

SELECT t.id_transaccion, t.tipo_transaccion, t.monto, t.fecha, s.nombre_sucursal
FROM public.transacciones t
JOIN public.sucursales s ON t.id_sucursal = s.id_sucursal
WHERE t.id_cuenta = 'UUID'  -- Reemplaza con el UUID de la cuenta
AND t.fecha BETWEEN DATE '2024-01-01' AND DATE '2025-12-31'  -- Comparación de fechas con timestamps
ORDER BY t.fecha ASC;

-- 3. Consulta para verificar el estado de un préstamo de un cliente

SELECT p.id_prestamo, p.monto, p.tasa_interes, p.fecha_aprobacion, p.estado_prestamo
FROM Prestamos p
JOIN Clientes c ON p.id_cliente = c.id_cliente
WHERE p.id_cliente = 'uuid_cliente';

-- 4. Consulta para comprobar el saldo disponible de las tarjetas de crédito de un cliente

SELECT c.nombre_cliente, tc.id_tarjeta, tc.limite_credito, tc.saldo_disponible, tc.estado
FROM Tarjetas_Credito tc
JOIN Clientes c ON tc.id_cliente = c.id_cliente
WHERE tc.id_cliente = 'uuid_cliente';

-- 5. Consulta para verificar las solicitudes de atención al cliente abiertas

SELECT ac.id_ticket, c.id_cliente, c.nombre_cliente, ac.fecha_ticket, ac.asunto, ac.estado_ticket
FROM Atencion_Clientes ac
JOIN Clientes c ON ac.id_cliente = c.id_cliente
WHERE ac.estado_ticket = 'Abierto' -- WHERE ac.estado_ticket IN ('Abierto', 'Cerrado', 'En Proceso')
ORDER BY ac.fecha_ticket ASC;

-- 6. Consulta para obtener el saldo total de todas las cuentas en una sucursal

SELECT c.id_cuenta, cl.nombre_cliente, c.tipo_cuenta, c.saldo
FROM Cuentas c
JOIN Clientes cl ON c.id_cliente = cl.id_cliente
ORDER BY c.saldo DESC;

          `}</code></pre>
        </div>
      </section>

      <section className="sql-section">
        <h2 className="section-title">Procedimientos Almacenados</h2>
        <div className="mockup-code">
          <pre><code className="language-sql">{`

INSERT INTO Sucursales (id_sucursal, nombre_sucursal, ubicacion)
VALUES 
    (uuid_generate_v4(), 'Sucursal Norte', 'Avenida Norte 456, Ciudad B');


INSERT INTO Clientes (id_cliente, nombre_cliente, direccion, tel_cliente, correo_cliente)
VALUES 
    (uuid_generate_v4(), 'Juan Pérez', 'Calle Falsa 123, Ciudad A', '555-1234', 'juan.perez@email.com'),
    (uuid_generate_v4(), 'María López', 'Avenida Siempre Viva 456, Ciudad B', '555-5678', 'maria.lopez@email.com');

-- Obtener ids de cliente y sucursal

SELECT id_cliente FROM Clientes WHERE nombre_cliente = 'Juan Pérez';
SELECT id_sucursal FROM Sucursales WHERE nombre_sucursal = 'Sucursal Centro';


INSERT INTO Cuentas (id_cuenta, id_cliente, tipo_cuenta, saldo, fecha_apertura, id_sucursal)
VALUES 
    (uuid_generate_v4(), 'id_cliente_de_juan', 'Ahorros', 0.00, CURRENT_DATE, 'id_sucursal_centro'),
    (uuid_generate_v4(), 'id_cliente_de_maria', 'Corriente', 0.00, CURRENT_DATE, 'id_sucursal_norte');


-- Para tabla transacciones usar funvtion depositar y retiro

INSERT INTO Prestamos (id_prestamo, id_cliente, monto, tasa_interes, fecha_aprobacion, estado_prestamo)
VALUES 
    (uuid_generate_v4(), 'id_cliente_de_juan', 10000.00, 5.5, CURRENT_DATE, 'Aprobado'),
    (uuid_generate_v4(), 'id_cliente_de_maria', 20000.00, 4.8, CURRENT_DATE, 'Pendiente');


INSERT INTO Tarjetas_Credito (id_tarjeta, id_cliente, limite_credito, saldo_disponible, fecha_emision, estado)
VALUES 
    (uuid_generate_v4(), 'id_cliente_de_juan', 5000.00, 3000.00, CURRENT_DATE, 'Activa'),
    (uuid_generate_v4(), 'id_cliente_de_maria', 8000.00, 8000.00, CURRENT_DATE, 'Bloqueada');


INSERT INTO Atencion_Clientes (id_ticket, id_cliente, fecha_ticket, asunto, estado_ticket)
VALUES 
    (uuid_generate_v4(), 'id_cliente_de_juan', CURRENT_DATE, 'Problema con el pago', 'Abierto'),
    (uuid_generate_v4(), 'id_cliente_de_maria', CURRENT_DATE, 'Solicitud de cambio de dirección', 'Cerrado');

          `}</code></pre>
        </div>
      </section>

      <section className="sql-section">
        <h2 className="section-title">Instalacion de Database y Administrador-SQL</h2>
        <p>A modo de ejemplo podemos correr el sistema bancarío facilmente con Docker para simular servidores y su comunicación con el siguiente código yml </p>
        <div className="mockup-code">
          <pre><code className="language-sql">{`-- Compose file para Docker (docker-compose.yml)

version: "3.9"
services:
  sistema_bancario_central:
    image: postgres
    restart: always
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: 12345
      POSTGRES_DB: CentralBanco
    ports:
      - 5432:5432
    logging:
      driver: none

  sistema_bancario_sucursal:
    image: postgres
    restart: always
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: 12345
      POSTGRES_DB: SucursalBanco
    ports:
      - 5433:5432
    logging:
      driver: none

      
  pgadmin:
    image: dpage/pgadmin4
    restart: always
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@gmail.com
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - 4321:80   
    logging:
      driver: none
`}</code></pre>
        </div>
      </section>

      <footer>
        <p>Documentación SQL - By Carlos Ramos.</p>
      </footer>
    </div>
  );
}

export default App;
